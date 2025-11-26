import { composioInstance, externalUserId } from "@/src/composio/config";

export default function Home() {
	const requestLoginUrl = async () => {
		const response = await fetch("/api/login");
		const redirectUrl = await response.text();
		window.location.href = redirectUrl;
	};
	return (
		<main>
			<h1>Welcome to Chatbot Demo</h1>
			<button type="button" onClick={requestLoginUrl}>
				Login with Twitter
			</button>
		</main>
	);
}
