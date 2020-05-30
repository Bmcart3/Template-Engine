const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


//do the inquirer prompts here.
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
    //console.log(response); //response.answer will get the value (answer) of the unique question.
    let newGuy;
    if (data.role === "Engineer") {
        newGuy = new Engineer(data.name, data.id, data.email, response.answer)
    } else if (data.role === "Intern") {
        newGuy = new Intern(data.name, data.id, data.email, response.answer)
    } else {
        newGuy = new Manager(data.name, data.id, data.email, response.answer)
    };
    //console.log(newGuy);
    team.push(newGuy);
    //console.log(team);
};

//Need to allow them to pick another employeeif they want... then recycle initial questions.
//When team is complete need to use the render function and writefile...

initialQuestions();



