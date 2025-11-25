import { composioInstance, externalUserId } from "@/src/composio/config";

export async function GET(req: Request, res: Response) {
    const connectionRequest = await composioInstance.connectedAccounts.link(
        externalUserId,
        process.env.TWITTER_AUTH_CONFIG_ID || "",
        { callbackUrl: "http://localhost:3000/chat" }
    );

    // redirect the user to the OAuth flow
    const redirectUrl = connectionRequest.redirectUrl;

    if (!redirectUrl) throw new Error("No redirect URL found");
    console.log(`Please authorize the app by visiting this URL: ${redirectUrl}`);

    // wait for connection to be established
    // await connectionRequest.waitForConnection();
    return new Response(redirectUrl);
}