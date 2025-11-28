import { tools } from "@/src/composio/config";

export async function GET() {
	return new Response(JSON.stringify({ toolList: tools }));
}
