import { CommandLineParser } from '@rushstack/ts-command-line';
import { SearchUserCommandLineAction } from './SearchUserAction';

class GithubScannerCommandLineParser extends CommandLineParser {
  constructor() {
    super({
      toolFilename: 'github-scanner',
      toolDescription: 'github 查找工具',
    });

    this.addAction(new SearchUserCommandLineAction());
  }
  protected onDefineParameters(): void {
    // throw new Error('Method not implemented.');
  }
}

new GithubScannerCommandLineParser().execute();
