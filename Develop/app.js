const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty arrays to push new members
const teamMembers = [];
const idArray = [];

createManager();
// prompts user in node to input info about manager
function createManager() {
    console.log("please build your team");
    inquirer.prompt([
        {
            type: "input",
            message: "what is your managers name",
            name: "managerName",
        },
        {
            type: "input",
            message: "what is your managers id",
            name: "managerId",
        },
        {
            type: "input",
            message: "what is your managers email",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "what is your managers office number",
            name: "managerNum",
        }

    ]).then(response => {
        // grabs object name ids into their own response. and is stored into manager 
        //console.log(response.managerName)
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNum);
        // pushes teammember array to manager 
        teamMembers.push(manager);
        //pushes the managers id to idArray
        idArray.push(response.managerId);
        createTeam();
        // console.log(teamMembers);
        // console.log(idArray)
    });

}
// prompts user in node to input info about engineer

function addEngineer() {
    //console.log("please build your team");
    inquirer.prompt([
        {
            type: "input",
            message: "what is your Engineers name",
            name: "engineerName",

        },
        {
            type: "input",
            message: "what is your Engineers id",
            name: "engineerId",
        },
        {
            type: "input",
            message: "what is your Engineers email",
            name: "engineerEmail",
        },
        {
            type: "input",
            message: "what is your Engineers github",
            name: "engineerGithub",
        }

    ]).then(response => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        teamMembers.push(engineer);
        idArray.push(response.EngineerId);
        createTeam();
        // console.log(teamMembers);
        // console.log(idArray)
    });

}

function addIntern() {
// prompts user in node to input info about intern

    inquirer.prompt([
        {
            type: "input",
            message: "what is your Interns name",
            name: "internName",

        },
        {
            type: "input",
            message: "what is your interns id",
            name: "internId",
        },
        {
            type: "input",
            message: "what is your interns email",
            name: "internEmail",
        },
        {
            type: "input",
            message: "what is your intern school",
            name: "internSchool",
        }

    ]).then(response => {

        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        teamMembers.push(intern);
        idArray.push(response.InternId);
        createTeam();
    });

}
// prompts user wheter or not they would like to add a new teammember or to not add anymore
function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I dont want to add any more team members"
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.memberChoice) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    })
}


function buildTeam() {
    // console.log("unison")
    //create the output path if it doesnt exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
}
