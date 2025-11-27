import { openai } from "@ai-sdk/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embed, embedMany } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { encodingForModel } from "js-tiktoken";
import { db } from "../db";
import { embeddings } from "../db/schema/embeddings";

const embeddingModelOpenAI = "text-embedding-ada-002";
const embeddingModel = `openai/${embeddingModelOpenAI}`;

const generateChunks = async (text: string) => {
	// Initialize tiktoken encoder for the embedding model
	const encoder = encodingForModel(embeddingModelOpenAI);

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000, // Maximum tokens per chunk
		chunkOverlap: 200, // 20% overlap to preserve context
		separators: ["\n\n", "\n", " ", ""], // Logical split points
		lengthFunction: (text: string) => {
			// Get accurate token count using tiktoken
			const tokens = encoder.encode(text);
			return tokens.length;
		},
	});

	// Split the text into chunks
	const chunks = await textSplitter.splitText(text);

	console.log("Generated chunks:", chunks);
	return chunks;
};

export const generateEmbeddingsFromInputs = async (
	value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
	const chunks = await generateChunks(value);
	const { embeddings } = await embedMany({
		model: embeddingModel,
		// model: openai.embedding(embeddingModelOpenAI),
		values: chunks,
	});
	console.log("embeddings", embeddings);

	return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbeddingFromPrompt = async (value: string): Promise<number[]> => {
	const input = value.replaceAll("\n", " ");
	const { embedding } = await embed({
		model: embeddingModel,
		// model: openai.embedding(embeddingModelOpenAI),
		value: input,
	});
	return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
	const userQueryEmbedded = await generateEmbeddingFromPrompt(userQuery);
	const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedded)})`;
	const results = await db
		.select({ content: embeddings.content, similarity })
		.from(embeddings)
		.where(gt(similarity, 0.3))
		.orderBy((t) => desc(t.similarity))
		.limit(4);
	console.log("results", results);
	return results.map((g) => g.content);
};
