import { LoadingSpinner } from "./LoadingSpinner";

interface HeaderProps {
	onMenuClick: () => void;
	isLoading: boolean;
}

export function Header({ onMenuClick, isLoading }: HeaderProps) {
	return (
		<div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
			<div className="flex items-center space-x-3">
				<button
					type="button"
					onClick={onMenuClick}
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
					<div className="text-sm text-gray-500 dark:text-gray-400">
						<LoadingSpinner text="Thinking..." />
					</div>
				)}
			</div>
		</div>
	);
}
