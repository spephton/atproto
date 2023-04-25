import bsky from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();


const agent = new BskyAgent({
    service: 'https://bsky.social',
});

console.log("made agent");

await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
});

console.log("logged in");

const bleet = 'grug send this microblag with bisky API tyvm @aliceisjustplaying.bsky.social';

await agent.post({
    text: bleet,
});

console.log("success?");