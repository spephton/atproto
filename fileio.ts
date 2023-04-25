import fs from 'node:fs/promises';
import process from 'node:process';


const stfile = process.cwd() + '/.sessiontoken';

const stReadback = await fs.readFile(
    stfile, {encoding: 'utf-8'}
);

console.log(stReadback);

const sessionToken = "3bf8ea905examplesessiontoken5e";

await fs.writeFile(stfile, sessionToken);