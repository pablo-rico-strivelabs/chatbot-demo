import { Composio } from "@composio/core";
import { VercelProvider } from "@composio/vercel";
import { TOOLKITS } from "./toolkits";

export const composioInstance = new Composio({
	apiKey: process.env.COMPOSIO_API_KEY,
	provider: new VercelProvider(),
});

// Id of the user in your system
// TODO remove after testing
export const externalUserId = "pg-test-0decf1db-bcb3-424d-83d7-c256c9393a1c";

export const tools = await composioInstance.tools.get(externalUserId, {
	toolkits: [TOOLKITS.TWITTER],
});
