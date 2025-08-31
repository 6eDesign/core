import { promises as fs } from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export class Generator {
  private templatesDir: string;
  private targetDir: string;

  constructor(templatesDir: string, targetDir: string) {
    this.templatesDir = templatesDir;
    this.targetDir = targetDir;
  }

  public async run(
    templateFilePaths: { [key: string]: string },
    data: any,
    subdirectories: string[] = []
  ): Promise<void> {
    await this.checkTargetDirectory();
    await this.createDirectories(subdirectories);
    const templates = await this.loadTemplates(Object.values(templateFilePaths));
    const compiledTemplates = this.compileTemplates(templates, data);
    await this.writeFiles(compiledTemplates, templateFilePaths);
  }

  public async copyFiles(filesToCopy: { [key: string]: string }): Promise<void> {
    for (const dest in filesToCopy) {
      const src = filesToCopy[dest];
      const srcPath = path.join(this.templatesDir, src);
      const destPath = path.join(this.targetDir, dest);
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
    }
  }

  private async checkTargetDirectory(): Promise<void> {
    try {
      const stats = await fs.stat(this.targetDir);
      if (stats.isDirectory()) {
        const files = await fs.readdir(this.targetDir);
        if (files.length > 0) {
          throw new Error(
            `Target directory '${this.targetDir}' is not empty. Aborting to prevent accidental overwrite.`
          );
        }
      }
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        // Ignore if directory simply doesn't exist
        throw error;
      }
    }
  }

  private async createDirectories(subdirectories: string[]): Promise<void> {
    await fs.mkdir(this.targetDir, { recursive: true });
    for (const subdir of subdirectories) {
      await fs.mkdir(path.join(this.targetDir, subdir), { recursive: true });
    }
  }

  private async loadTemplates(templateFileNames: string[]): Promise<{ [key: string]: string }> {
    const templates: { [key: string]: string } = {};
    for (const templateFileName of templateFileNames) {
      const templatePath = path.join(this.templatesDir, templateFileName);
      templates[templateFileName] = await fs.readFile(templatePath, 'utf8');
    }
    return templates;
  }

  private compileTemplates(templates: { [key: string]: string }, data: any): { [key: string]: string } {
    const compiledTemplates: { [key: string]: string } = {};
    for (const templateFileName in templates) {
      const template = Handlebars.compile(templates[templateFileName]);
      compiledTemplates[templateFileName] = template(data);
    }
    return compiledTemplates;
  }

  private async writeFiles(compiledTemplates: { [key:string]: string }, templateFilePaths: { [key: string]: string }): Promise<void> {
    for (const outputFileName in templateFilePaths) {
      const templateFileName = templateFilePaths[outputFileName];
      const compiledContent = compiledTemplates[templateFileName];
      const outputFilePath = path.join(this.targetDir, outputFileName);
      await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
      await fs.writeFile(outputFilePath, compiledContent);
    }
  }
}