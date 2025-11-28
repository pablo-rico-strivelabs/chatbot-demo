export interface MessagePart {
	type: string;
	text: string;
}

export interface ChatMessage {
	id: string;
	role: "system" | "user" | "assistant";
	parts: MessagePart[];
}

export interface Tool {
	name: string;
	description?: string;
}
