"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { useTools } from "@/src/hooks/api/useTools";
import { Sidebar, Header, MessageList, InputArea } from "@/src/components/Chat";

export default function Page() {
	const [input, setInput] = useState("");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
		onToolCall({ toolCall }) {
			console.log("Tool call:", toolCall);
		},
		onError: (err) => {
			console.error("Chat error:", err);
		},
		onFinish: (data) => {
			console.log("Chat finished:", data);
		},
	});

	const isLoading = ["submitting", "streaming"].includes(status);
	const { data: tools } = useTools();

	const handleSendMessage = async () => {
		if (!input.trim()) return;

		await sendMessage({
			parts: [{ type: "text", text: input }],
		});
		setInput("");
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				tools={tools}
			/>

			<div className="flex-1 flex flex-col min-w-0">
				<Header
					onMenuClick={() => setIsSidebarOpen(true)}
					isLoading={isLoading}
				/>

				<MessageList messages={messages} />

				<InputArea
					input={input}
					onInputChange={setInput}
					onSend={handleSendMessage}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
