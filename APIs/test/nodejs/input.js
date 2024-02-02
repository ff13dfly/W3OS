const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getInput=()=>{
    rl.question('root:', (command) => {
        console.log(`${command},ready to go`);
        getInput();
    })
}

getInput();

// const inquirer = require('inquirer');
// const questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "What's your name?",
//   },
// ];

// inquirer.prompt(questions).then(answers => {
//   console.log(`Hi ${answers.name}!`);
// });