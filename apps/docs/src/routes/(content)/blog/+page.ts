import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

// This function runs on the server during prerendering
export const load: PageLoad = async ({ fetch }) => {
	const modules = import.meta.glob('./*.md', { eager: true }); // Get all markdown files in this directory
	console.log('Globbed modules:', JSON.stringify(modules, null, 2));

	const posts = [];

	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop()?.replace('.md', '').replace(/^\./, ''); // Extract slug from filename and remove leading dot

		if (slug && module.metadata) {
			// Check if metadata exists
			posts.push({
				slug,
				meta: module.metadata // Frontmatter is available as metadata
			});
		}
	}

	// Sort posts by date, newest first
	posts.sort((a, b) => {
		const dateA = a.meta.date ? new Date(a.meta.date) : new Date(0);
		const dateB = b.meta.date ? new Date(b.meta.date) : new Date(0);
		return dateB.getTime() - dateA.getTime();
	});

	return {
		posts
	};
};
