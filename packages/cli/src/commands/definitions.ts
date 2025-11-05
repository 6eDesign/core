import { graphCommand } from './graph';
import { generateWorkflowMatrixCommand } from './generate-workflow-matrix';
import { workflowWaitOnJobsCommand } from './workflow-wait-on-jobs';
import { newPackageCommand } from './new-package';
import { newProjectCommand } from './new-project';
import { newZRPCServiceCommand } from './new-zrpc-service';
import { deployCommand } from './deploy';

export const commands = [
	deployCommand,
	graphCommand,
	generateWorkflowMatrixCommand,
	workflowWaitOnJobsCommand,
	newPackageCommand,
	newProjectCommand,
	newZRPCServiceCommand
];
