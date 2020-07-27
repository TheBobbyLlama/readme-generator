const fs = require("fs");
const inquirer = require("inquirer");
const { licenseOptions, generateMarkdown } = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [
	{
		type: "input",
		name: "projectName",
		message: "What is the project name? (Required)",
		validate: nameInput => {
			if (nameInput) {
				return true;
			} else {
				console.log("Your project needs a name!");
				return false;
			}
		}
	},
	{
		type: "input",
		name: "description",
		message: "Provide a description of the project. (Required)",
		validate: descInput => {
			if (descInput) {
				return true;
			} else {
				console.log("Your project needs a description!");
				return false;
			}
		}
	},
	{
		type: "input",
		name: "installation",
		message: "Provide any installation instructions for the project:",
	},
	{
		type: "input",
		name: "usage",
		message: "Provide any usage information for the project:",
	},
	{
		type: "input",
		name: "contributing",
		message: "Provide any details on contributing to the project:",
	},
	{
		type: "input",
		name: "tests",
		message: "Provide any tests for the project:",
	},
	{
		type: "list",
		name: "license",
		message: "Choose a license for the project:",
		choices: licenseOptions,
		default: 0,
	},
	{
		type: "input",
		name: "github",
		message: "Provide your Github username for anyone who has questions:",
	},
	{
		type: "input",
		name: "email",
		message: "Provide your email address for anyone who has questions:",
	},
];

// function to write README file
function writeToFile(fileName, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, data, err => {
			if (err) {
				reject(err);
			} else {
				resolve({
					ok: true,
					message: "File created successfully!  Look for it in the dist folder."
				});
			}
		})
	});
}

// function to initialize program
function init() {
	inquirer.prompt(questions).then(data => {
		return generateMarkdown(data);
	}).then(output => {
		return writeToFile("./dist/README.md", output);
	}).then(result => {
		console.log(result.message);
	}).catch(err => {
		console.log(err);
	});
}

// function call to initialize program
init();
