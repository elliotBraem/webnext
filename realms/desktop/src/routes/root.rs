use {dioxus::prelude::*, log::*};

pub fn render(cx: Scope) -> Element {
	const HELLO: &'static str = "Hello Rust community";

	debug!("{}", HELLO);

	render!(
			p {
					HELLO,
					p { HELLO }
					p { HELLO }
					p { HELLO }
			}
	)
}
