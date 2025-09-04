import { mount, unmount } from 'svelte';
import CopyButton from '../components/CopyButton.svelte';

interface Options {
	html: string;
}

export function copyCode(node: HTMLElement, { html }: Options) {
	const pres = Array.from(node.querySelectorAll('pre'));
	let buttons = pres.map((pre) => {
		const code = pre.innerText;
		const button = mount(CopyButton, { target: pre, props: { code } });
		return button;
	});

	console.log(buttons);

	return {
		destroy() {
			buttons.forEach((button) => unmount(button));
		}
	};
}
