import { GithubService } from './github.service';

export interface ScmService {
  waitForJobs(
    owner: string,
    repo: string,
    runId: number,
    jobNames: string[],
    timeoutSeconds?: number
  ): Promise<void>;
}

export const createScmService = (scm: string): ScmService => {
  switch (scm) {
    case 'github':
      return new GithubService();
    default:
      throw new Error(`Unsupported SCM: ${scm}`);
  }
};
