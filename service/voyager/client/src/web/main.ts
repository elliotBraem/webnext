import "@unocss/reset/normalize.css"
import "@unocss/reset/sanitize/assets.css"
import "@unocss/reset/sanitize/sanitize.css"
import { NearSocialBridgeProvider, Spinner, overrideLocalStorage } from "near-social-bridge"
import "near-social-bridge/near-social-bridge.css"
import { FunctionComponent, VNode, h, render } from "preact"
import "virtual:uno.css"

import { NearSocialBridgeProps } from "near-social-bridge/bridge/types"
import { EverythingNavigator } from "../../../../../navigator/everything/mod"

interface PatchedNearSocialBridgeProps extends Partial<NearSocialBridgeProps> {
	fallback?: VNode<null>
	waitForStorage: boolean
}

overrideLocalStorage()

render(
	h(
		NearSocialBridgeProvider as FunctionComponent<PatchedNearSocialBridgeProps>,
		{ waitForStorage: true, fallback: h(Spinner, null) },
		h("style", null, "html, body { width: 100%; height: 100% };"),
		h(EverythingNavigator, {}),
	),

	document.body,
)
