import type React from "react";
import { useRef } from "react";

interface FileUploadButtonProps {
	onFileUpload: (files: FileList) => void;
	isLoading?: boolean;
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
}

export function FileUploadButton({
	onFileUpload,
	isLoading = false,
	accept = ".pdf,.doc,.docx,.txt,.md,.csv",
	multiple = true,
	disabled = false,
}: FileUploadButtonProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			onFileUpload(files);
		}
		// Reset the input so the same file can be uploaded again
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const triggerFileUpload = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			{/* Hidden file input */}
			<input
				ref={fileInputRef}
				type="file"
				multiple={multiple}
				onChange={handleFileUpload}
				className="hidden"
				accept={accept}
				disabled={disabled || isLoading}
			/>

			{/* File upload button */}
			<button
				type="button"
				onClick={triggerFileUpload}
				disabled={disabled || isLoading}
				className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
					text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 
					focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer max-h-50"
				title="Upload files"
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
						d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
					/>
				</svg>
			</button>
		</>
	);
}
