#!/usr/bin/env node
import path from 'path';
import dayjs from 'dayjs';
import ora from 'ora';

import {
  JsonFile,
  FileSystem,
  Encoding,
  StringBuilder,
} from '@rushstack/node-core-library';
import {
  CommandLineAction,
  CommandLineFlagParameter,
  CommandLineStringListParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';

import { searchUser } from './api';

export class SearchUserCommandLineAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'user',
      summary: '搜用户',
      documentation: '使用 github 登录名搜索用户',
    });
  }

  protected onDefineParameters(): void {
    this._nameList = this.defineStringListParameter({
      argumentName: 'LOGIN_NAME',
      parameterLongName: '--login-name',
      parameterShortName: '-n',
      required: true,
      description: '用户 github 登录名',
    });

    this._json = this.defineFlagParameter({
      parameterLongName: '--json',
      description: '是否输出 JSON 格式',
    });

    this._outJsonFile = this.defineStringParameter({
      parameterLongName: '--output',
      parameterShortName: '-o',
      argumentName: 'OUTPUT_JSON_FILENAME',
      defaultValue: path.resolve(process.cwd(), 'github-user.log'),
      description:
        '指定输出文件路径，如果未指定，默认为 <当前路径>/github-user.log',
    });
  }

  protected async onExecute(): Promise<void> {
    const loginNameList = this._nameList.values!;
    const outputAsJson = this._json.value;
    const allData: any[] = [];
    const sb = new StringBuilder();

    for (const name of loginNameList) {
      const spinner = ora(`${name} searching...`).start();
      let isTimeout = false;
      const datum = await searchUser(name).catch(() => {
        spinner.fail(`${name} timeout.`);
        isTimeout = true;
        return null;
      });
      if (isTimeout) {
        continue;
      }
      if (!datum) {
        spinner.fail(`${name} Not Found.`);
        continue;
      }
      const frontEndRepos = datum.repositories.nodes.filter(
        (d) =>
          d.primaryLanguage?.name &&
          isFrontEndProject(d.primaryLanguage.name.toLowerCase())
      );
      const outputData = {
        loginName: name,
        name: datum.name,
        websiteUrl: datum.websiteUrl,
        url: datum.url,
        avatarUrl: datum.avatarUrl,
        followerCount: datum.followers.totalCount,
        createdAt: datum.createdAt,
        repoStars: frontEndRepos.reduce((acc, cur) => {
          acc = acc + cur.stargazerCount;
          return acc;
        }, 0),
        frontEndRepos: frontEndRepos,
      };
      if (outputAsJson) {
        allData.push(outputData);
      } else {
        sb.append(`Login：${outputData.loginName}\n`);
        sb.append(`账号：${outputData.name}\n`);
        sb.append(`github 地址：${outputData.url}\n`)；
        sb.append(`website 地址：${outputData.websiteUrl}`)
        sb.append(
          `创建日期：${dayjs(outputData.createdAt).format('YYYY/MM/DD')}\n`
        );
        sb.append(`被关注数：${outputData.followerCount}人\n`);
        sb.append(`获得的 Stars：${outputData.repoStars}\n`);
        sb.append('\n');
      }
      spinner.succeed(`${name} found.`);
    }

    if (outputAsJson) {
      JsonFile.save(allData, this._outJsonFile.value!, {
        ensureFolderExists: true,
      });
    } else {
      FileSystem.writeFile(this._outJsonFile.value!, sb.toString(), {
        ensureFolderExists: true,
        encoding: Encoding.Utf8,
      });
    }
  }

  private _nameList!: CommandLineStringListParameter;
  private _json!: CommandLineFlagParameter;
  private _outJsonFile!: CommandLineStringParameter;
}

const _frontEndLanguages = [
  'typescript',
  'javascript',
  'html',
  'css',
  'coffeescript',
];
function isFrontEndProject(language: string) {
  return _frontEndLanguages.includes(language);
}
