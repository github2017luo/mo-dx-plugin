import {UX} from '@salesforce/command';
import * as chalk from 'chalk';
import { DeployResult } from '../service/deploy';
import { CompileErrors } from '../types/errorLog';

export function display(deployResult: DeployResult, ux: UX) {
    const errors = [] as CompileErrors[];
    const tableColumnData = {
      columns: [
        { key: 'lineNumber', label: chalk.redBright.bold('Line')},
        { key: 'columnNumber', label: chalk.redBright.bold('Column') },
        { key: 'problem', label: chalk.redBright.bold('Error Description') }
      ]
    };
    for (const error of deployResult.queryResult.records[0].DeployDetails.componentFailures) {
      const errorLog = {} as CompileErrors;
      errorLog.columnNumber = error.columnNumber;
      errorLog.lineNumber = (error.lineNumber);
      errorLog.problem = chalk.bold(error.problem);
      errors.push(errorLog);
    }
    ux.table(errors, tableColumnData);
}
