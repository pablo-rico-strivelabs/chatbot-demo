"use client";

import { useChat } from "@ai-sdk/react";
import { VercelToolCollection } from "@composio/vercel";
import { DefaultChatTransport } from "ai";
import { useState, useEffect } from "react";

export default async function Page() {
	const [input, setInput] = useState("");

	const { messages, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});
  

  // welcome message
  // useEffect(() => {
  //   sendMessage({
  //     parts: [{ type: "text", text: "Hello! What can you do for me?" }],
  //   });
  
  // }, [sendMessage])
  

	console.log(messages);

	return (
		<div>
      <h2 className="flex">Twitter AI Assistant</h2>
      {/* tool list
      <ul>
        {toolList.tools.map((tool) => (
          <li key={tool.name}>
            <strong>{tool.name}</strong>: {tool.description}
          </li>
        ))}
      </ul> */}
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
	);
}
