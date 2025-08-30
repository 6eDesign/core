import { defineCommand } from '../utils/defineCommand';
import { execa } from 'execa';
import dot from '@dagrejs/graphlib-dot';
import graphlib from '@dagrejs/graphlib';

export async function getDependencyGraph(): Promise<graphlib.Graph> {
	const { stdout } = await execa('pnpm', ['turbo', 'run', 'build', '--graph']);
	return dot.read(stdout);
}

export async function getParallelDeploymentOrder(): Promise<string[][]> {
	const graph = await getDependencyGraph();

	const inDegree: Record<string, number> = {};
	const nodes = graph.nodes();
	for (const node of nodes) {
		inDegree[node] = 0;
	}

	for (const edge of graph.edges()) {
		inDegree[edge.w]++;
	}

	let queue = nodes.filter(node => inDegree[node] === 0);
	const result: string[][] = [];

	while (queue.length > 0) {
		const level = queue.map(node => {
			const match = node.match(/\[root\] (.*?)#build/);
			return match ? match[1] : null;
		}).filter((name): name is string => name !== null && name !== '___ROOT___');

		if (level.length > 0) {
			result.push(level);
		}

		const nextQueue: string[] = [];
		for (const node of queue) {
			for (const successor of graph.successors(node) || []) {
				inDegree[successor]--;
				if (inDegree[successor] === 0) {
					nextQueue.push(successor);
				}
			}
		}
		queue = nextQueue;
	}

	return result;
}


export async function getTopologicalOrder(): Promise<string[]> {
	const order = await getParallelDeploymentOrder();
	return order.flat();
}

export const graphCommand = defineCommand({
	name: 'graph',
	description: 'Get information about the workspace dependency graph',
	subcommands: [
		defineCommand({
			name: 'order',
			description: 'Get the deployment order of the workspaces',
			handler: async () => {
				const sorted = await getTopologicalOrder();
				console.log(JSON.stringify(sorted, null, 2));
			}
		}),
		defineCommand({
			name: 'parallel-order',
			description: 'Get the parallel deployment order of the workspaces',
			handler: async () => {
				const sorted = await getParallelDeploymentOrder();
				console.log(JSON.stringify(sorted, null, 2));
			}
		}),
		defineCommand({
			name: 'json',
			description: 'Get the dependency graph in JSON format',
			handler: async () => {
				const graph = await getDependencyGraph();
				console.log(JSON.stringify(graphlib.json.write(graph), null, 2));
			}
		})
	]
});
