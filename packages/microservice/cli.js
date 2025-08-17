#!/usr/bin/env node
import path from 'path';
import { promises as fs } from 'fs';

const openAPI = async () => {
  const { service } = await import(
    'file://' + path.resolve(process.cwd(), 'service.js')
  );
  const doc = service.generateOpenAPI();
  await fs.writeFile(
    path.resolve(process.cwd(), 'openapi.json'),
    JSON.stringify(doc, null, 2)
  );
};

openAPI();
