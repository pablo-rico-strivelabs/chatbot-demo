interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	text?: string;
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-3 w-3",
		md: "h-4 w-4",
		lg: "h-6 w-6",
	};

	return (
		<div className="flex items-center space-x-2">
			<div
				className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]}`}
			/>
			{text && <span className="text-sm">{text}</span>}
		</div>
	);
}
