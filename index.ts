import  bsky, { AtpAgent, AtpSessionData } from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();
import fs from 'node:fs/promises';
import { read } from 'node:fs';
// import zod from 'zod'; TODO use zod

const SESSIONDATA = process.cwd() + '/.sessiondata.json';

async function main() {
    const agent = new BskyAgent({
        service: 'https://bsky.social',
    });

    const sdFileContents = await fs.readFile(
        SESSIONDATA, {encoding: 'utf-8'}
    );
    
    // this doesn't validate
    const readSessionData: AtpSessionData = JSON.parse(sdFileContents);

    let sessionData: AtpSessionData;
    let loginSuccessful: boolean = false;
    // this isn't really validation
    if (readSessionData.hasOwnProperty('accessJwt') ) {
        const res = await agent.resumeSession(readSessionData);
        loginSuccessful = res.success;
        if (loginSuccessful) {
            const session = res.data as unknown;
            sessionData = session as AtpSessionData;
            console.log("login via saved token successful")
        }
    }

    if (!loginSuccessful) {
        const res = await cleanLogin(agent);
        loginSuccessful = res.success;
        console.log("login via username")
        if (loginSuccessful) {
            const session = res.data as unknown;
            sessionData = session as AtpSessionData;
            console.log("login via name and password successful")
        }
        else {
            console.log("Couldn't log in!");
            return; // exit
        }
    }

    // we should now have a session!




    const bleet = 'grug send this microblag with bisky API tyvm @aliceisjustplaying.bsky.social';

    /*
    await agent.post({
        text: bleet,
    });
    */

    console.log("success?");
}

function cleanLogin(agent: AtpAgent){
    return agent.login({
        identifier: process.env.BSKY_USERNAME!,
        password: process.env.BSKY_PASSWORD!,
    });
}

await main();