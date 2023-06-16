import { readdirSync } from 'fs';
import inquirer from 'inquirer';
import path from 'path';

const challenges = readdirSync(path.resolve('./src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const questions = [
  {
    type: 'list',
    name: 'day',
    message: 'Choose a challenge day to run',
    choices: challenges,
    filter(val) {
      return val;
    },
  },
];

inquirer.prompt(questions).then(({ day }) => {
  import(`./${day}/index.js`).then((module) => {
    module.run();
  });
});

export {};
