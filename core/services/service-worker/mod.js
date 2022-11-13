if('serviceWorker' in navigator) {
	globalThis.addEventListener('load', () => void navigator.serviceWorker.register('/sw.js', { scope: '/' }))
}
