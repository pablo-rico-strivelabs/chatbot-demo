import type React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface InputAreaProps {
	input: string;
	onInputChange: (value: string) => void;
	onSend: () => void;
	isLoading: boolean;
}

export function InputArea({
	input,
	onInputChange,
	onSend,
	isLoading,
}: InputAreaProps) {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			onSend();
		}
	};

	return (
		<div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
			<div className="flex space-x-3">
				<div className="flex-1 relative">
					<textarea
						value={input}
						onChange={(e) => onInputChange(e.target.value)}
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
					onClick={onSend}
					disabled={!input.trim() || isLoading}
					className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 
						text-white rounded-lg transition-colors duration-200 
						focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						disabled:cursor-not-allowed flex items-center space-x-2"
				>
					{isLoading ? (
						<LoadingSpinner />
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
	);
}
