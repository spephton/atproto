import fs from 'node:fs/promises';
import process from 'node:process';
import { AtpSessionData } from '@atproto/api';


const stfile = process.cwd() + '/.sessiondata.json';

const stReadback = await fs.readFile(
    stfile, {encoding: 'utf-8'}
);

// no guardrails
const sessiondata: AtpSessionData = JSON.parse(stReadback);

console.log(sessiondata);
