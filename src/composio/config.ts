import { Composio } from "@composio/core";
import { VercelProvider } from "@composio/vercel";
import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { TOOLKITS } from "./toolkits";
import { TWITTER_TOOLS } from "./twitterTools";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new VercelProvider(),
});

// Id of the user in your system
const externalUserId = "pg-test-0decf1db-bcb3-424d-83d7-c256c9393a1c";

const connectionRequest = await composio.connectedAccounts.link(
    externalUserId,
    process.env.TWITTER_AUTH_CONFIG_ID || "",
    { callbackUrl: "http://localhost:3000" }
);

// redirect the user to the OAuth flow
const redirectUrl = connectionRequest.redirectUrl;
console.log(`Please authorize the app by visiting this URL: ${redirectUrl}`);

// wait for connection to be established
const connectedAccount = await connectionRequest.waitForConnection();

export const tools = await composio.tools.get(externalUserId, TWITTER_TOOLS.TWITTER_FULL_ARCHIVE_SEARCH);

