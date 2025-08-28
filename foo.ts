import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const { data: commitFiles } = await octokit.repos.getContent({
    owner: 'TomaszKasowicz',
    repo: 'release-toil-app',
    path: 'package.json',
});

console.log(JSON.stringify(commitFiles, null, 2));