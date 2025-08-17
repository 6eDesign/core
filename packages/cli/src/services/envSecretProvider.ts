import { ISecretProvider } from '@6edesign/cicd-core';

export class EnvSecretProvider implements ISecretProvider {
  async getSecret(key: string): Promise<string> {
    const secret = process.env[key];
    if (secret === undefined) {
      throw new Error(`Secret '${key}' not found in environment variables.`);
    }
    return secret;
  }
}
