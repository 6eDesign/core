import { json } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET({ params }) {
  const segments = params.slug ? params.slug.split('/') : [];

  let markdownPath = `/api-docs/${segments.join('/')}`;

  // Heuristic: If the last segment doesn't look like a file extension, assume it's a directory and try README.md
  if (!markdownPath.endsWith('.md')) {
      markdownPath = `${markdownPath}/README.md`;
  }

  const baseFsPath = join(process.cwd(), 'static'); // Base path for static files
  const fullFsPath = join(baseFsPath, markdownPath);

  try {
    const content = await readFile(fullFsPath, 'utf-8');
    return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
  } catch (e) {
    console.error(`Failed to read file ${fullFsPath}:`, e);
    return new Response('Not found', { status: 404 });
  }
}
