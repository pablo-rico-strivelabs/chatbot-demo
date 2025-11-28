interface EmptyStateProps {
	title: string;
	description: string;
	icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
	return (
		<div className="text-center py-12">
			{icon && (
				<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
					{icon}
				</div>
			)}
			<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
				{description}
			</p>
		</div>
	);
}
