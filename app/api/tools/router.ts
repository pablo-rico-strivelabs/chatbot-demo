import { composioInstance, externalUserId, tools } from "@/src/composio/config";

export async function GET(req: Request, res: Response) {
    
    return new Response(JSON.stringify({ toolList: tools }));
}