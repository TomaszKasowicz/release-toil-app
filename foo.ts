import { Octokit } from "@octokit/rest";
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const head = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const result = await octokit.pulls.create({
    owner: 'TomaszKasowicz',
    repo: 'release-toil-app',
    title: 'Test',
    body: 'Test',
    head: head,
    base: 'main',
    assignees: ['TomaszKasowicz'],
    labels: ['test', 'non-existent'],
});

console.log(JSON.stringify(result, null, 2));
// const { data: commitFiles } = await octokit.repos.getContent({
//     owner: 'TomaszKasowicz',
//     repo: 'release-toil-app',
//     path: 'package.json',
// });

// console.log(JSON.stringify(commitFiles, null, 2));