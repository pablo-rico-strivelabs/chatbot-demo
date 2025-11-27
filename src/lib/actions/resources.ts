"use server";

import {
	insertResourceSchema,
	type NewResourceParams,
	resources,
} from "@/src/lib/db/schema/resources";
import { generateEmbeddingsFromInputs } from "../ai/embedding";
import { db } from "../db";
import { embeddings as embeddingsTable } from "../db/schema/embeddings";

export const createResource = async (input: NewResourceParams) => {
	try {
		const { content } = insertResourceSchema.parse(input);

		const [resource] = await db
			.insert(resources)
			.values({ content })
			.returning();

		const embeddings = await generateEmbeddingsFromInputs(content);
		await db.insert(embeddingsTable).values(
			embeddings.map((embedding) => ({
				resourceId: resource.id,
				...embedding,
			})),
		);
		return "Resource successfully created and embedded.";
	} catch (error) {
		return error instanceof Error && error.message.length > 0
			? error.message
			: "Error, please try again.";
	}
};
