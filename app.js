const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

const render = require("./lib/htmlRenderer");
const team = [];

//Initial inquirer prompts
const initialQuestions = () => {
    inquirer.prompt([
        {
            message: "What is your name?",
            name: "name"
        },
        {
            message: "What is your employee id?",
            name: "id"
        },
        {
            message: "What is your e-mail?",
            name: "email"
        },
        {
            type: "list",
            message: "What is your role?",
            choices: ["Engineer", "Intern", "Manager"],
            name: "role"
        }
    ]).then(function (answers) {
        roleChecker(answers);
    });
};

//checks to see which employee role is chosen and sets question variable to appropriate question based on user input
async function roleChecker(data) {
    let question;
    if (data.role === "Engineer") {
        question = "What is your gitHub username?"
    } else if (data.role === "Intern") {
        question = "What school are you attending?"
    } else {
        question = "What is your office number?"
    };
    //once an employee role is determined, inquirer prompts the new message for specified role.
    const response = await inquirer.prompt([
        {
            type: "input",
            message: question,
            name: "answer"
        }
    ]);
    //creates new engineer, intern, or manager
    //response.answer will get the value (answer) of the unique question.
    let newGuy;
    if (data.role === "Engineer") {
        newGuy = new Engineer(data.name, data.id, data.email, response.answer)
    } else if (data.role === "Intern") {
        newGuy = new Intern(data.name, data.id, data.email, response.answer)
    } else {
        newGuy = new Manager(data.name, data.id, data.email, response.answer)
    };
    team.push(newGuy);
    addMember();
};

//Determines if the user wants another member on the team or not. If yes, reruns initial questions. If not, renders the team and writes a new file in output folder.
async function addMember() {
    const response = await inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "newMember"
        }
    ]);
    if (response.newMember) {
        initialQuestions();
    } else {
        render(team);
        fs.writeFile("./output/team.html", render(team), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
        });
    };
};

initialQuestions();



