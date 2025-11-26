import { composioInstance, externalUserId } from "@/src/composio/config";

export async function GET() {
	const connectionRequest = await composioInstance.connectedAccounts.link(
		externalUserId,
		process.env.TWITTER_AUTH_CONFIG_ID || "",
		{ callbackUrl: "http://localhost:3000/chat" },
	);

	// redirect the user to the OAuth flow
	const redirectUrl = connectionRequest.redirectUrl;

	if (!redirectUrl) throw new Error("No redirect URL found");
	return new Response(redirectUrl);
}
