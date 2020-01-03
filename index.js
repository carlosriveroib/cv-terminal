#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./data.json");

const response = chalk.green;
const EXIT_OPTION = "See you soon!";

const resumeOptions = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know?",
  choices: [...Object.keys(data), EXIT_OPTION]
};

function showResume() {
  console.log("Hello 👋, my name is Carlos Rivero and here is my resume.");
  handleResume();
}

function handleResume() {
  inquirer.prompt(resumeOptions).then(answer => {
    if (answer.resumeOptions === EXIT_OPTION) {
      console.log(response("Thank you!"));
      return;
    }

    const options = data[`${answer.resumeOptions}`];

    if (options) {
      console.log(response(new inquirer.Separator("~~~~~~~~~~~~~~~~")));
      options.forEach(info => {
        console.log(response("=> " + info));
      });
      console.log(response(new inquirer.Separator("~~~~~~~~~~~~~~~~")));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      }).then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
          console.log(response("Thank you!"));
          return;
        }
      });
  }).catch(err => console.log("Ooops,", err))
}

showResume();
