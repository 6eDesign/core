import { Octokit } from '@octokit/rest';
import { ScmService } from './scm.service';

export class GithubService implements ScmService {
  private octokit: Octokit;

  constructor() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN is not set.');
    }
    this.octokit = new Octokit({ auth: token });
  }

  async waitForJobs(
    owner: string,
    repo: string,
    runId: number,
    jobNames: string[],
    timeoutSeconds = 600 // Default timeout of 10 minutes
  ): Promise<void> {
    if (jobNames.length === 0) {
      return;
    }

    console.log(`Waiting for jobs: ${jobNames.join(', ')}`);

    const jobNamesSet = new Set(jobNames);
    const startTime = Date.now();

    const checkJobs = async (): Promise<void> => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      if (elapsedTime > timeoutSeconds) {
        throw new Error(`Timed out waiting for jobs to complete.`);
      }

      try {
        const { data: { jobs } } = await this.octokit.actions.listJobsForWorkflowRun({
          owner,
          repo,
          run_id: runId,
        });

        const relevantJobs = jobs.filter(job => jobNamesSet.has(job.name));

        if (relevantJobs.length < jobNames.length) {
          // Not all jobs have started yet, wait and retry
          await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
          return checkJobs();
        }

        const completedJobs = relevantJobs.filter(job => job.status === 'completed');

        if (completedJobs.length === jobNames.length) {
          const failedJobs = completedJobs.filter(job => job.conclusion === 'failure');
          if (failedJobs.length > 0) {
            const failedJobNames = failedJobs.map(job => job.name).join(', ');
            throw new Error(`The following jobs failed: ${failedJobNames}`);
          }
          // All jobs completed successfully
          return;
        }

        // Some jobs are still running, wait and retry
        await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
        return checkJobs();
      } catch (error) {
        console.error('Error while waiting for jobs:', error);
        throw error;
      }
    };

    return checkJobs();
  }
}
