const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

newTeam = []

const render = require("./lib/htmlRenderer");

function createTeam(){
    inquirer.prompt({
      type: "list",
      message:"Which member of the team would you like to add?",
      choices:["Add an intern", "Add an engineer", "Add a manager", "Create Team Page"],
      name:"role"          
    }).then(function(response){
        console.log(response);
        if (response.role === "Add an intern"){
            newIntern();
        }
        else if (response.role === "Add an engineer"){
            newEngineer();
        }
        else if (response.role === "Add a manager"){
            newManager();
        }
        else if (response.role === "Create Team Page"){
            createTeamPage();
        }
            
    })
}

async function newIntern(){
    console.log("adding Intern")
    await inquirer.prompt([
        {
         type: "input",
         message: "What's their name?",
         name: "name",
     },
     {
         type: "input",
         message: "Employee ID Number?",
         name: "id",
     },
     {
         type: "input",
         message: "What is their email?",
         name: "email",
     },
     {
         type: "input",
         message: "What school are they attending?",
         name: "github",
     },
 ]).then(function(internRes){
    const newIntern = new Intern(internRes.name, internRes.id, internRes.email, internRes.school);
    
    newTeam.push(newIntern);


    createTeam();
});
}

async function newEngineer(){
    console.log("adding Engineer")
    await inquirer.prompt([
        {
         type: "input",
         message: "What's their name?",
         name: "name",
     },
     {
         type: "input",
         message: "Employee ID Number?",
         name: "id",
     },
     {
         type: "input",
         message: "What is their email?",
         name: "email",
     },
     {
         type: "input",
         message: "What is their github user ID?",
         name: "github",
     },
 ]).then(function(engRes){
    const newEngineer = new Engineer(engRes.name, engRes.id, engRes.email, engRes.github);
    
    newTeam.push(newEngineer);


    createTeam();
});
}

async function newManager(){
    console.log("adding Manager...")
    await inquirer.prompt([
        {
         type: "input",
         message: "What's their name?",
         name: "name",
     },
     {
         type: "input",
         message: "Employee ID Number?",
         name: "id",
     },
     {
         type: "input",
         message: "What is their email?",
         name: "email",
     },
     {
         type: "input",
         message: "What is their office number?",
         name: "officeNumber",
     },
 ]).then(function(manRes){
    const newManager = new Manager(manRes.name, manRes.id, manRes.email, manRes.github);
    
    newTeam.push(newManager);


    createTeam();
}); 
}



function createTeamPage(){
    if (newTeam.length > 0){
        fs.writeFile(outputPath, render(newTeam), function(err) {
            if (err) {
                    return console.log(err);
                } console.log ("Page Generated!")
        })

    } 
    else {
        console.log("Please add team members first!")
    }
}



createTeam();
