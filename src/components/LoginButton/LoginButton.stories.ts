// story book file for LoginButton component
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import LoginButton from "./LoginButton";

const meta = {
	title: "Components/LoginButton",
	component: LoginButton,
	parameters: {},
	tags: ["autodocs"],
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
	args: { onClick: fn() },
} satisfies Meta<typeof LoginButton>;

export default meta;
// type Story = StoryObj<typeof meta>;

// export default {
//     title: "Components/LoginButton",
//     component: LoginButton,
// } as Meta;
