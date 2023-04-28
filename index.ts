import  bsky, { AtpAgent, AtpSessionData } from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();
import fs from 'node:fs/promises';
import { read } from 'node:fs';
import { z, ZodError } from "zod";

const SESSIONDATA = process.cwd() + '/.sessiondata.json';

async function main() {
    const agent = new BskyAgent({
        service: 'https://bsky.social',
    });

    let readSessionData: AtpSessionData | null = null;
    try {
        const sdFileContents = await fs.readFile(
            SESSIONDATA, {encoding: 'utf-8'},
        );
        readSessionData = Session.parse(
            JSON.parse(sdFileContents)
        );
    }
    catch (e) {
        if (e instanceof Object && "code" in e && e.code === 'ENOENT') {
            // readSessionData will be null
            // tricky to work out how to catch this specifically
        }
        else if (e instanceof ZodError || e instanceof SyntaxError) {
            // if no other err, readSessionData is non-null
            // really should just blanket catch all err here,
            // we handle them all by having rSD be nullable
        }
        else {
            throw e;
        }
    }

    let sessionData: AtpSessionData;
    let loginSuccessful: boolean = false;
    /*
    let res = await agent.resumeSession(readSessionData);
    loginSuccessful = res.success;
    if (loginSuccessful) {
        const session = res.data as unknown;
        sessionData = session as AtpSessionData;
        console.log("login via saved token successful")
    }


    if (!loginSuccessful)
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

*/


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

const Session = z.object({
    did: z.string(),
    handle: z.string(),
    refreshJwt: z.string(),
    accessJwt: z.string(),
    email: z.optional(z.string()),
})




await main();