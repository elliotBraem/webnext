import type { AttributifyAttributes } from "@unocss/preset-attributify"
import { HTMLAttributes as StandardHTMLAttributes } from "preact"

declare module "preact" {
	namespace JSX {
		interface HTMLAttributes extends AttributifyAttributes, StandardHTMLAttributes {}
	}
}
