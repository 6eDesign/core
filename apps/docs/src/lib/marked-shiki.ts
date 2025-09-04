import { createHighlighter } from 'shiki';
import { unescape } from 'html-escaper';

export const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-dark-dimmed'],
	langs: ['javascript', 'typescript', 'html', 'css', 'shell', 'json']
});

export const shiki = {
	async: true,
	async walkTokens(token) {
		if (token.type === 'code' && typeof token.text === 'string') {
			console.log('Highlighting code block:', token);
			const html = highlighter.codeToHtml(token.text, {
				lang: token.lang,
				theme: 'github-dark'
			});
			console.log('Generated HTML:', html);
			token.text = html;
		}
	}
};
