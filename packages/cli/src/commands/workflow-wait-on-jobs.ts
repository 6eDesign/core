import { defineCommand } from '../utils/defineCommand';
import { createScmService } from '../services/scm.service';
import { z } from 'zod';

const workflowWaitOnJobsHandler = async (options: {
  jobs: string;
  timeout?: number;
  scm?: string;
}) => {
  const { GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env;

  if (!GITHUB_REPOSITORY) {
    throw new Error('GITHUB_REPOSITORY is not set.');
  }

  if (!GITHUB_RUN_ID) {
    throw new Error('GITHUB_RUN_ID is not set.');
  }

  const [owner, repo] = GITHUB_REPOSITORY.split('/');
  const runId = parseInt(GITHUB_RUN_ID, 10);
  const jobNames = JSON.parse(options.jobs);

  const scmService = createScmService(options.scm);
  await scmService.waitForJobs(owner, repo, runId, jobNames, options.timeout);
};

export const workflowWaitOnJobsCommand = defineCommand({
  name: 'workflow-wait-on-jobs',
  description: 'Wait for a set of jobs in the current workflow run to complete.',
  inputs: {
    jobs: {
      schema: z.string(),
      description: 'A JSON array of job names to wait for.',
    },
    timeout: {
      schema: z.number().optional(),
      description: 'The timeout in seconds.',
    },
    scm: {
      schema: z.string().optional().default('github'),
      description: 'The SCM to use (e.g., github).',
    },
  },
  handler: workflowWaitOnJobsHandler,
});
