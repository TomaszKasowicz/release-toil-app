// @ts-check
/** @param {import('@actions/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
const fs = require('fs');

module.exports = async({github, context}) => {
    console.log('++++++++++++++++Hello');

    const packageJson = fs.readFileSync('package.json', 'utf8');
    console.log(JSON.stringify(packageJson, null, 2));
  }