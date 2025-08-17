import { CliCommandSchema } from '../types/cli';
import { createScmService } from '../services/scm.service';
import { z } from 'zod';

const workflowWaitOnJobsHandler = async (options: z.infer<typeof workflowWaitOnJobsCommand.options[number]>) => {
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

export const workflowWaitOnJobsCommand = CliCommandSchema.parse({
  name: 'workflow-wait-on-jobs',
  description: 'Wait for a set of jobs in the current workflow run to complete.',
  options: [
    {
      name: '--jobs <json>',
      description: 'A JSON array of job names to wait for.',
      type: 'string',
      required: true,
    },
    {
      name: '--timeout <seconds>',
      description: 'The timeout in seconds.',
      type: 'number',
      required: false,
      parser: (value: string) => parseInt(value, 10),
    },
    {
      name: '--scm <scm>',
      description: 'The SCM to use (e.g., github).',
      type: 'string',
      required: false,
      default: 'github',
    },
  ],
  handler: workflowWaitOnJobsHandler,
});
