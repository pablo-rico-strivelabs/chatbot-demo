import type { Tool } from "@/src/types/chat";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
	tools?: Tool[];
}

export function Sidebar({ isOpen, onClose, tools }: SidebarProps) {
	return (
		<>
			{/* Mobile sidebar overlay */}
			{isOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
					onClick={onClose}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
				fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
				transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
				${isOpen ? "translate-x-0" : "-translate-x-full"}
			`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						Composio Tools
					</h2>
					<button
						type="button"
						onClick={onClose}
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
									title={tool.description}
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
		</>
	);
}