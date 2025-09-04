import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const modules = import.meta.glob('./*.md', { eager: true });
	const guides = [];
	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop()?.replace('.md', '').replace(/^\./, '');
		if (slug && module.metadata) {
			guides.push({
				slug,
				meta: module.metadata
			});
		}
	}
	guides.sort((a, b) => {
		const dateA = a.meta.date ? new Date(a.meta.date) : new Date(0);
		const dateB = b.meta.date ? new Date(b.meta.date) : new Date(0);
		return dateB.getTime() - dateA.getTime();
	});
	return { guides };
};
