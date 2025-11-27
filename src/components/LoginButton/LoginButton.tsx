import type { FC } from "react";
import "./styles.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LoginButton: FC<Props> = ({ onClick }) => {
	return (
		<button type="button" onClick={onClick}>
			Login with Twitter
		</button>
	);
};

export default LoginButton;
