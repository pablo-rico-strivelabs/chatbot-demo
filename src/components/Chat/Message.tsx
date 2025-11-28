import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MessagePart } from "@/src/types/chat";

interface MessageProps {
	id: string;
	role: "system" | "user" | "assistant";
	parts: MessagePart[];
}

export function Message({ role, parts }: MessageProps) {
	return (
		<div
			className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`
					max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] px-4 py-3 rounded-2xl
					${
						role === "user"
							? "bg-blue-600 text-white rounded-br-md"
							: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm"
					}
				`}
			>
				{parts.map((part, index) => {
					if (part.type === "text") {
						return (
							<div
								key={`${part.type}-${index}`}
								className="prose prose-sm max-w-none dark:prose-invert"
							>
								{role === "user" ? (
									<p className="text-white m-0">{part.text}</p>
								) : (
									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											code({ className, children, ...props }) {
												const match = /language-(\w+)/.exec(className || "");
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
												<ul className="mb-2 last:mb-0 pl-4">{children}</ul>
											),
											ol: ({ children }) => (
												<ol className="mb-2 last:mb-0 pl-4">{children}</ol>
											),
											li: ({ children }) => (
												<li className="mb-1">{children}</li>
											),
											h1: ({ children }) => (
												<h1 className="text-xl font-bold mb-2">{children}</h1>
											),
											h2: ({ children }) => (
												<h2 className="text-lg font-semibold mb-2">
													{children}
												</h2>
											),
											h3: ({ children }) => (
												<h3 className="text-md font-medium mb-2">{children}</h3>
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
	);
}
