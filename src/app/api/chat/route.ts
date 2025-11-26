import { tools } from '@/src/composio/config';
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TODO use convertDataPart for tool data parsing?
  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant. Start with a greeting message describing your available tools',
    messages: convertToModelMessages(messages, { tools }),
    tools: tools,
  });

  return result.toUIMessageStreamResponse();
}