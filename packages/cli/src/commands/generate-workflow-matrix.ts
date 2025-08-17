import { CliCommandSchema } from '../types/cli';
import { getDependencyGraph } from '../commands/graph';
import path from 'path';
import { promises as fs } from 'fs';

const generateWorkflowMatrixHandler = async (options: {
  publishedPackages: string;
}) => {
  let environments: string[];
  let publishedPackages: { name: string; version: string }[];

  try {
    const configPath = path.join(process.cwd(), 'deploy.config.mjs');
    // Check if the file exists before attempting to import
    await fs.access(configPath, fs.constants.F_OK); // Check if file exists
    const config = await import(configPath);
    if (!config.default || !Array.isArray(config.default.environments)) {
      console.warn('Warning: Invalid deploy.config.mjs format. Expected a default export with an environments array. Returning empty matrix.');
      console.log(JSON.stringify({ include: [] })); // Return empty matrix
      return;
    }
    environments = config.default.environments;
  } catch (error: any) {
    if (error.code === 'ENOENT') { // File not found error
      console.warn('Warning: deploy.config.mjs not found. Returning empty matrix.');
      console.log(JSON.stringify({ include: [] })); // Return empty matrix
      return;
    }
    console.error('Error loading environments from deploy.config.mjs:', error);
    process.exit(1); // Still exit for other errors
  }

  try {
    publishedPackages = JSON.parse(options.publishedPackages);
  } catch (error) {
    console.error('Error parsing published packages JSON:', error);
    process.exit(1);
  }

  const graph = await getDependencyGraph();
  const jobs = { include: [] as any[] };
  const nameRegex = /\[root\] (.*?)#build/;

  const getNodeName = (pkg: string) => `[root] ${pkg}#build`;

  for (const pkg of publishedPackages) {
    for (let i = 0; i < environments.length; i++) {
      const env = environments[i];
      const jobName = `deploy-${pkg.name}-${env}`;
      const needs: string[] = [];

      // Dependency on previous environment
      if (i > 0) {
        needs.push(`deploy-${pkg.name}-${environments[i - 1]}`);
      }

      // Dependencies on other packages in the same environment
      const nodeName = getNodeName(pkg.name);
      const successors = graph.successors(nodeName) || [];
      for (const succ of successors) {
        const match = succ.match(nameRegex);
        if (match && match[1]) {
          const depName = match[1];
          // Check if the dependency was also published
          if (publishedPackages.some(p => p.name === depName)) {
            needs.push(`deploy-${depName}-${env}`);
          }
        }
      }

      jobs.include.push({
        job_name: jobName,
        package_name: pkg.name,
        env_name: env,
        needs: needs,
      });
    }
  }

  console.log(JSON.stringify(jobs));
};

export const generateWorkflowMatrixCommand = CliCommandSchema.parse({
  name: 'generate-workflow-matrix',
  description: 'Generates the GitHub Actions matrix for sequential environment deployments.',
  options: [
    {
      name: '--published-packages <json>',
      description: 'JSON string of published packages (name and version).',
      type: 'string',
      required: true,
      prompt: {
        type: 'input',
        message: 'Enter published packages JSON:',
      },
    },
  ],
  handler: generateWorkflowMatrixHandler,
  subcommands: [],
});
