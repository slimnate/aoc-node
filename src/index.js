import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'list',
      name: 'day',
      message: 'Choose a day to run',
      choices: ['01'],
      filter(val) {
        return val;
      },
    },
  ])
  .then(({ day }) => {
    import(`./${day}/index.js`).then((module) => {
      module.run();
    });
  });

export {};
