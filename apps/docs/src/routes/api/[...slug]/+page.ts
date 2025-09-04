import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const segments = params.slug ? params.slug.split('/') : [];

  let apiContent = '';
  let baseUrl = '/api-docs/'; // Default base URL for TypeDoc output

  console.log('Current segments:', segments);

  if (segments.length === 0) {
    // This is the /api route. We should list available packages.
    apiContent = `
# API Documentation Overview

Welcome to the 6eDesign Framework API documentation.

## Packages

*   [zRPC](/api/@6edesign/zrpc)
*   [Microservice](/api/@6edesign/microservice)
*   [Data Circuits](/api/@6edesign/data-circuits)
*   [ESLint Config](/api/@6edesign/eslint-config)
*   [Messenger](/api/@6edesign/messenger)
*   [Tracing](/api/@6edesign/tracing)
*   [TSConfig](/api/@6edesign/tsconfig)

`;
  } else {
    // Fetch from the local API endpoint
    const apiEndpointPath = `/api/${segments.join('/')}`;

    try {
      const response = await fetch(apiEndpointPath);
      if (!response.ok) {
        throw error(response.status, 'API documentation not found');
      }
      apiContent = await response.text();
      console.log('Fetched API Content (first 100 chars):', apiContent.substring(0, 100));
    } catch (e) {
      console.error(`Failed to load API documentation from endpoint ${apiEndpointPath}:`, e);
      throw error(404, 'API documentation not found');
    }

    // Calculate baseUrl for marked based on the original static file path
    let markdownPathForBaseUrl = `/api-docs/${segments.join('/')}`;
    if (!markdownPathForBaseUrl.endsWith('.md')) {
        baseUrl = `${markdownPathForBaseUrl}/`;
    } else {
        const lastSlashIndex = markdownPathForBaseUrl.lastIndexOf('/');
        baseUrl = markdownPathForBaseUrl.substring(0, lastSlashIndex + 1);
    }
  }

  return {
    segments,
    apiContent,
    baseUrl // Pass baseUrl to the component
  };
};