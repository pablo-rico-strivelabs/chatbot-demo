"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, FileUIPart, TextUIPart } from "ai";
import { useState } from "react";
import { Header, InputArea, MessageList, Sidebar } from "@/src/components/Chat";
import { useTools } from "@/src/hooks/api/useTools";
import { filesToFileUIPart, filesToTextUIPart } from "@/src/utils/files";

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

	const handleFileUpload = async (files: FileList) => {
		const fileArray = Array.from(files);
		console.log("Files uploaded:", fileArray);

		const fileObjects: FileUIPart[] = await filesToFileUIPart(files);
		// for some reason the model doesn't accept plain text files https://github.com/vercel/ai/issues/7399
		const textObjects: TextUIPart[] = await filesToTextUIPart(files);

		await sendMessage({
			role: "system",
			parts: [
				{
					type: "text",
					text: "Extract the text from these files and add them to the database and respond to the user accordingly.",
				},
				...fileObjects,
				...textObjects,
			],
		});
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
					onFileUpload={handleFileUpload}
				/>
			</div>
		</div>
	);
}
