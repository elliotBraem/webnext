import { type JSX, h } from "preact"

export interface ButtonProps extends JSX.HTMLAttributes {
	kind: "button" | "link"
	label: string
	onClick?: JSX.MouseEventHandler<EventTarget>
	rootTag?: keyof JSX.IntrinsicElements
	variant?: "primary" | "outlined" | "text"
}

export const Button = ({
	kind = "button",
	label,
	onClick,
	rootTag = "button",
	...restProps
}: ButtonProps) =>
	h(
		// @ts-ignore
		rootTag,

		{
			onClick: kind === "button" ? onClick : () => void null,
			...restProps,
		},

		label,
	)
