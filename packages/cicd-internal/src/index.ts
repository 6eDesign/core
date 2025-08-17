import { createChildCicdEngine } from '@6edesign/cicd-core';
import baseCicd from '@6edesign/cicd';

export const cicd = createChildCicdEngine(baseCicd, {
  pulumiConfig: {
    organization: "stacker-org",
    project: "stacker-monorepo",
    environments: {
      dev: "dev",
      staging: "staging",
      prod: "prod",
    },
  },
});
