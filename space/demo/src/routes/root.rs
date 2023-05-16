use dioxus::prelude::*;

pub fn display(cx: Scope) -> Element {
	render! ({
		<audio id="player" preload="auto" loop="loop">
			<source src="https://cloudflare-ipfs.com/ipfs/bafybeifyrtsvn2xefvlx3tv6mqhwyuaibjutfapfekw56brklx4bxowjxm/theme.mp3" type="audio/mpeg" />
		</audio>

		<img id="image" src="https://cloudflare-ipfs.com/ipfs/bafybeidayprq2jsd2w2z3oi5i7updwy7xep57zptmevcxwfsfl42udzz74" />
		<h1 id="play-button">{"▶"}</h1>

		<script language="javascript">
			const playButton = document.getElementById("play-button")
			const player = document.getElementById("player")

			document.addEventListener("DOMContentLoaded", () => void document.addEventListener("mousedown", () => {
				player.play()
				playButton.classList.add("hidden")
			}))
		</script>
	})
}
