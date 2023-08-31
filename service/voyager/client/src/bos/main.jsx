const VoyagerBOSClientConfig = {
	/**
	 *	`wendersonpires.testnet/widget/NearSocialBridgeCore` for testnet
	 */
	bridgeSrc: "wendersonpires.near/widget/NearSocialBridgeCore",

	/** External App URL (must) */
	externalAppUrl: "http://127.0.0.1:5173",

	/**
	 *	Initial Payload (optional) - Do not use async data here, it may fail to be ready before sending this initial payload.
	 *	If you want to get some data, make a "request"
	 *
	 *	Use "useInitialPayload()" hook inside the external app to get this data
	 */
	initialPayload: {},

	/** Initial view height (optional) */
	initialViewHeight: 500,
}

const getAccountIdHandler = (request, response) => {
	// You have access to the request payload
	console.log(request.payload) // Any data sent by the External App

	/* rome-ignore lint: `context` is provided by BOS FE API */
	const { accountId } = context

	// Send a response to the External App (React App)
	// "response" needs the "request" object to know the type of the request
	// you can read this as "a response to a request"
	response(request).send({ accountId })
}

/**
 * Request Handler.
 *
 * - request: payload sent by External App
 *
 * - response: method to send the answer back to the External App
 *
 * - utils: Utils features like
 *	- promisify: (caller, resolve, reject)
 *		There's no Promise for some features yet,
 *		So this is util for when you need to get cached data using DiscoveryAPI, e.g:
 *			utils.promisify(() => Social.getr(`${context.accountId}/profile`), (res) => console.log(res), (err) => console.log(err))
 *
 * @param {{type: string, payload: {}}} request request with payload sent by External App
 * @param {(request) => {send: () => void}} response send the answer back to the External App
 * @param {{promisify:(caller: () => void, resolve: (data) => void, reject: (error) => void)}} utils Utils features like
 */
const requestHandler = (request, response, Utils) => {
	switch (request.type) {
		case "get-account-id":
			getAccountIdHandler(request, response)
			break
	}
}

/* rome-ignore lint: `styled` is provided by BOS FE API */
const WindowsArea = styled.div`
	& > div {}
`

const VoyagerBOSClient = ({
	/** Initial Path (optional) */
	path,
	...otherProps
}) => (
	<WindowsArea className="d-flex flex-column gap-4">
		{/* rome-ignore lint: `Widget` is provided by BOS FE API */}
		<Widget
			src={VoyagerBOSClientConfig.bridgeSrc}
			props={{ path, requestHandler, ...VoyagerBOSClientConfig, ...otherProps }}
		/>

		{/* rome-ignore lint: `Widget` is provided by BOS FE API */}
		<Widget
			src={VoyagerBOSClientConfig.bridgeSrc}
			props={{ path, requestHandler, ...VoyagerBOSClientConfig, ...otherProps }}
		/>
	</WindowsArea>
)

return VoyagerBOSClient(props)
