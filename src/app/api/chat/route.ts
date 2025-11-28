import {
	convertToModelMessages,
	stepCountIs,
	streamText,
	tool,
	type UIMessage,
} from "ai";
import { z } from "zod";
import { tools as composioTools } from "@/src/composio/config";
import { createResource } from "@/src/lib/actions/resources";
import { findRelevantContent } from "@/src/lib/ai/embedding";

export async function POST(req: Request) {
	const { messages }: { messages: UIMessage[] } = await req.json();

	// TODO use convertDataPart for tool data parsing?
	const result = streamText({
		onStepFinish: async (step) => {
			console.log("Finished step:", step);
		},
		onError: (error) => {
			console.error("Error during chat processing:", error);
		},
		onFinish: (data) => {
			console.log("Chat processing finished.", data);
		},
		// model: openai("gpt-4o"),
		model: "openai/gpt-4o",
		system: `
			You are a helpful assistant.
			Use the available tools to answer user questions as best as you can.
		`,
		messages: convertToModelMessages(messages),
		stopWhen: stepCountIs(5),
		tools: {
			...composioTools,
			addResource: tool({
				description: `Add a resource to your CV database.
          If the user provides a random text, use this tool without asking for confirmation.`,
				inputSchema: z.object({
					content: z
						.string()
						.describe("the content or resource to add to the CV database"),
				}),
				execute: async ({ content }) => {
					await createResource({ content });
					return "Resource added successfully.";
				},
			}),
			getInformation: tool({
				description: `Get information from your CV database to answer questions.`,
				inputSchema: z.object({
					question: z.string().describe("the users question"),
				}),
				outputSchema: z.array(
					z
						.string()
						.describe("relevant pieces of information from the results"),
				),
				execute: async ({ question }) => {
					const results = await findRelevantContent(question);
					return results;
				},
			}),
		},
	});

	return result.toUIMessageStreamResponse();
}
