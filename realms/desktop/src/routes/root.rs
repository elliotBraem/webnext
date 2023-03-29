use {dioxus::prelude::*, log::*};

#[ignore = "dead_code"]
pub fn gui(cx: Scope) -> Element {
	const HELLO: &'static str = "Hello Rust community!";

	debug!("{}", HELLO);

	render!(p { HELLO }, p { HELLO }, p { HELLO }, p { HELLO })
}
