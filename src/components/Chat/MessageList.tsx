import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/src/types/chat";
import { EmptyState } from "./EmptyState";
import { Message } from "./Message";

interface MessageListProps {
	messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when new messages arrive
	// biome-ignore lint/correctness/useExhaustiveDependencies: <we need to only track messages.length>
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{messages.length === 0 ? (
				<EmptyState
					title="Start a conversation"
					description="Ask me anything! I can help with questions, tasks, and use various tools to assist you."
					icon={
						<svg
							className="w-8 h-8 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					}
				/>
			) : (
				messages
					.filter((message) => message.role !== "system")
					.map((message) => <Message key={message.id} {...message} />)
			)}
			<div ref={messagesEndRef} />
		</div>
	);
}
