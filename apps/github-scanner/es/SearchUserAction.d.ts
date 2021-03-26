#!/usr/bin/env node
import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class SearchUserCommandLineAction extends CommandLineAction {
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
    private _nameList;
    private _json;
    private _outJsonFile;
}
