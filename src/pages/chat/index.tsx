"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { useTools } from "@/src/hooks/api/useTools";

export default function Page() {
	const [input, setInput] = useState("");

	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});

	const { data } = useTools();

	return (
		<div className="container max-xl mx-auto mt-10">
			<div className="grid grid-cols-3">
				<div className="col-span-1">
					<h4 className="text-2xl">Available Tools</h4>
					<ul>
						{data?.map((tool) => (
							<li key={tool.name} title={tool.description}>
								{tool.name}
							</li>
						))}
					</ul>
				</div>
				<div className="col-span-2">
					<h2 className="text-5xl">Twitter AI Assistant</h2>
					{messages.map((message, index) => (
						<div key={message.id}>
							{message.parts.map((part) => {
								if (part.type === "text") {
									return <div key={`${message.id}-text`}>{part.text}</div>;
								}
								if (part.type.startsWith("tool-")) {
									return (
										<div key={`${message.id}-tool`}>
											[Tool output: {part.type}]
											{part.output.data.data.map((item: any, idx: number) => (
												<div key={`${message.id}-tool-item-${idx}`}>
													{item.text}
												</div>
											))}
										</div>
									);
								}
								return null;
							})}
						</div>
					))}
					<input
						className="rounded-md placeholder-black text-black"
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
						onKeyDown={async (event) => {
							if (event.key === "Enter") {
								sendMessage({
									parts: [{ type: "text", text: input }],
								});
								setInput("");
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
