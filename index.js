#!/usr/bin/env node
import inquirer from 'inquirer';
import { args } from './libs/args.js';
import { ensure } from './libs/ensure.js';
import { projectTypes } from './libs/constants.js';
import { exec, scheduler } from './libs/scheduler.js';

(async () => {
  const result = scheduler(ensure, args.name);
  if (result) {
    const { cwd } = result;
    const resp = await inquirer.prompt([
      {
        name: 'libraryName',
        type: 'input',
        message: 'Enter name of the library',
        default: cwd.substring(cwd.lastIndexOf('/') + 1),
      },
      {
        name: 'projectType',
        type: 'list',
        choices: Object.keys(projectTypes),
        default: Object.keys(projectTypes).find(
          (key) => projectTypes[key] === 'tw'
        ),
        message: 'Select a type of project',
        filter(input) {
          return projectTypes[input];
        },
      },
      {
        name: 'description',
        type: 'input',
        message: 'Provide a description of your package',
        default: 'Rollup pack plugin',
      },
      {
        name: 'keywords',
        type: 'input',
        message: 'Keywords (separated by space)',
        default: 'library',
      },
      {
        name: 'license',
        type: 'confirm',
        message: 'Include a license?',
        default: true,
      },
      {
        name: 'build',
        type: 'confirm',
        message: 'Build project before publish?',
        default: false,
      },
    ]);
    exec();
    console.log(resp);
  }
})();
