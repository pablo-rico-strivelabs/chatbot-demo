"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { useTools } from "@/src/hooks/api/useTools";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
	const [input, setInput] = useState("");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
		onToolCall({ toolCall }) {
			console.log("Tool call:", toolCall);
		},
		onError: (err) => {
			console.error("Chat error:", err);
			setIsLoading(false);
		},
		onFinish: (data) => {
			console.log("Chat finished:", data);
			setIsLoading(false);
		},
	});

	const { data: tools } = useTools();

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages.length]);

	const handleSendMessage = async () => {
		if (!input.trim()) return;

		setIsLoading(true);
		await sendMessage({
			parts: [{ type: "text", text: input }],
		});
		setInput("");
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			{/* Mobile sidebar overlay */}
			{isSidebarOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
				fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
				transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
				${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
			`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Composio Tools
					</h2>
					<button
						type="button"
						onClick={() => setIsSidebarOpen(false)}
						className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
						aria-label="Close sidebar"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					{tools?.length ? (
						<div className="space-y-2">
							{tools.map((tool) => (
								<div
									key={tool.name}
									className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
								>
									<h3 className="font-medium text-gray-900 dark:text-white text-sm">
										{tool.name}
									</h3>
									{tool.description && (
										<p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
											{tool.description}
										</p>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
								<svg
									className="w-6 h-6 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5l-1-1z"
									/>
								</svg>
							</div>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								No tools available
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Main chat area */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Header */}
				<div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<button
							type="button"
							onClick={() => setIsSidebarOpen(true)}
							className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
							aria-label="Open sidebar"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white">
							AI Assistant
						</h1>
					</div>
					<div className="flex items-center space-x-2">
						{isLoading && (
							<div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
								<span>Thinking...</span>
							</div>
						)}
					</div>
				</div>

				{/* Messages area */}
				<div className="flex-1 overflow-y-auto p-4 space-y-4">
					{messages.length === 0 ? (
						<div className="text-center py-12">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
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
							</div>
							<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
								Start a conversation
							</h3>
							<p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
								Ask me anything! I can help with questions, tasks, and use
								various tools to assist you.
							</p>
						</div>
					) : (
						messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`
									max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] px-4 py-3 rounded-2xl
									${
										message.role === "user"
											? "bg-blue-600 text-white rounded-br-md"
											: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm"
									}
								`}
								>
									{message.parts.map((part, index) => {
										if (part.type === "text") {
											return (
												<div
													key={`${message.id}-text-${index}`}
													className="prose prose-sm max-w-none dark:prose-invert"
												>
													{message.role === "user" ? (
														<p className="text-white m-0">{part.text}</p>
													) : (
														<ReactMarkdown
															remarkPlugins={[remarkGfm]}
															components={{
																code({ node, className, children, ...props }) {
																	const match = /language-(\w+)/.exec(
																		className || "",
																	);
																	const isInline = !match;

																	if (isInline) {
																		return (
																			<code
																				className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 text-sm font-mono"
																				{...props}
																			>
																				{children}
																			</code>
																		);
																	}

																	return (
																		<pre className="bg-gray-900 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto">
																			<code className="text-sm font-mono">
																				{String(children).replace(/\n$/, "")}
																			</code>
																		</pre>
																	);
																},
																p: ({ children }) => (
																	<p className="mb-2 last:mb-0">{children}</p>
																),
																ul: ({ children }) => (
																	<ul className="mb-2 last:mb-0 pl-4">
																		{children}
																	</ul>
																),
																ol: ({ children }) => (
																	<ol className="mb-2 last:mb-0 pl-4">
																		{children}
																	</ol>
																),
																li: ({ children }) => (
																	<li className="mb-1">{children}</li>
																),
																h1: ({ children }) => (
																	<h1 className="text-xl font-bold mb-2">
																		{children}
																	</h1>
																),
																h2: ({ children }) => (
																	<h2 className="text-lg font-semibold mb-2">
																		{children}
																	</h2>
																),
																h3: ({ children }) => (
																	<h3 className="text-md font-medium mb-2">
																		{children}
																	</h3>
																),
																blockquote: ({ children }) => (
																	<blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-2 italic">
																		{children}
																	</blockquote>
																),
															}}
														>
															{part.text}
														</ReactMarkdown>
													)}
												</div>
											);
										}
										return null;
									})}
									<div className="text-xs opacity-60 mt-2">
										{new Date().toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
							</div>
						))
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input area */}
				<div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
					<div className="flex space-x-3">
						<div className="flex-1 relative">
							<textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Type your message... (Shift+Enter for new line)"
								disabled={isLoading}
								className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 
									bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
									placeholder-gray-500 dark:placeholder-gray-400
									focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
									disabled:opacity-50 disabled:cursor-not-allowed
									resize-none min-h-12 max-h-32"
								rows={1}
								style={{ height: "auto" }}
								onInput={(e) => {
									const target = e.target as HTMLTextAreaElement;
									target.style.height = "auto";
									target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
								}}
							/>
						</div>
						<button
							type="button"
							onClick={handleSendMessage}
							disabled={!input.trim() || isLoading}
							className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 
								text-white rounded-lg transition-colors duration-200 
								focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
								disabled:cursor-not-allowed flex items-center space-x-2"
						>
							{isLoading ? (
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							) : (
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
									/>
								</svg>
							)}
							<span className="hidden sm:inline">Send</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
