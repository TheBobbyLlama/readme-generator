const sectionInfo = [
  [ "Installation Instructions", "installation"],
  [ "Usage", "usage" ],
  [ "Contributing", "contributing" ],
  [ "Tests", "tests" ],
];

const licenseOptions = [ "None", "GNU", "MIT" ];
const licenseDescriptions = [
  [ "A license has not been chosen for this project.", "" ],
  [ "GNU General Public License v3.0", "https://choosealicense.com/licenses/gpl-3.0/" ],
  [ "MIT License", "https://choosealicense.com/licenses/mit/" ],
];
const licenseBadges = [
  "",
  "https://img.shields.io/badge/license-GPL-blue?style=plastic",
  "https://img.shields.io/badge/license-MIT-green?style=plastic",
]

function generateTOC(data) {
  var list = [];

  for (let i = 0; i < sectionInfo.length; i++) {
    if (data[sectionInfo[i][1]]) {
      list.push(sectionInfo[i][0]);
    }
  }

  list.push("License");

  if ((data.github) || (data.email)) {
    list.push("Questions");
  }

  if (list.length >= 3) {
    var result = `
## Table of Contents
`;

    for (let i = 0; i < list.length; i++) {
      result += `${i + 1}. [${list[i]}](#${list[i].toLowerCase().replace(/[\s]/g, "-")})
`
    }

    return result;
  } else {
    return "";
  }
}

function generateSections(data) {
  var result = "";

  for (var i = 0; i < sectionInfo.length; i++) {
    var curData = data[sectionInfo[i][1]];

    if (curData) {
      result += `
## ${sectionInfo[i][0]}
  
${curData}
`;
    }
  }

  return result;
}

function generateLicenseInfo(data) {
  var findMe = licenseOptions.indexOf(data);

  if (findMe > -1) {
    return `## License
    
[${licenseDescriptions[findMe][0]}](${licenseDescriptions[findMe][1]})`;
  } else {
    return "";
  }
}

function getLicenseBadge(data) {
  var findMe = licenseOptions.indexOf(data);

  if (findMe > 0) {
    return `

![License Badge](${licenseBadges[findMe]})`;
  } else {
    return "";
  }
}

function generateQuestionsSection({github, email}) {
  if ((github) || (email)) {
    var result = `## Questions?
Contact me:`;

    if (github) {
      result += `
- [${github} on Github](https://github.com/${github}/)`
    }

    if (email) {
      result += `
- ${email}`
    }

    return result;
  } else {
    return "";
  }
}

// function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.projectName}

${data.description}${getLicenseBadge(data.license)}
${generateTOC(data)}
${generateSections(data)}
${generateLicenseInfo(data.license)}
${generateQuestionsSection(data)}
`;}

module.exports = { licenseOptions, generateMarkdown };
