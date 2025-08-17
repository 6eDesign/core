export interface ISecretProvider {
  getSecret(key: string): Promise<string>;
}