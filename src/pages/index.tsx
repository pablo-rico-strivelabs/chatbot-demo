import LoginButton from "@/src/components/LoginButton";

export default function Home() {
	const requestLoginUrl = async () => {
		const response = await fetch("/api/login");
		const redirectUrl = await response.text();
		window.location.href = redirectUrl;
	};
	return (
		<main className="min-h-screen bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6">
			{/* Hero Section */}
			<div className="max-w-4xl mx-auto text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
						AI-Powered
						<span className="block text-blue-600 dark:text-blue-400">
							Recruitment Outreach
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
						Automate email drafting, intelligent responses, and seamless Gmail
						integration with advanced AI capabilities.
					</p>
				</div>

				{/* CTA Section */}
				<div className="pt-8">
					<LoginButton onClick={requestLoginUrl} />
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
						Secure authentication powered by Google
					</p>
				</div>
			</div>

			{/* Features Grid */}
			<div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-8 px-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
					<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg
							className="w-6 h-6 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="AI Email Drafting"
						>
							<title>AI Email Drafting</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						AI Email Drafting
					</h3>
					<p className="text-gray-600 dark:text-gray-300 text-sm">
						Generate professional email drafts with context-aware AI that
						understands your communication style.
					</p>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
					<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg
							className="w-6 h-6 text-green-600 dark:text-green-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Intelligent Assistant"
						>
							<title>Intelligent Assistant</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Intelligent Assistant
					</h3>
					<p className="text-gray-600 dark:text-gray-300 text-sm">
						Chat with your AI assistant to manage emails, get insights, and
						automate workflows seamlessly.
					</p>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
					<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
						<svg
							className="w-6 h-6 text-purple-600 dark:text-purple-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Gmail Integration"
						>
							<title>Gmail Integration</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Gmail Integration
					</h3>
					<p className="text-gray-600 dark:text-gray-300 text-sm">
						Direct integration with your Gmail account through secure OAuth for
						real-time email management.
					</p>
				</div>
			</div>
		</main>
	);
}
