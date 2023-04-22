use dioxus::prelude::*;

pub fn display(cx: Scope) -> Element {
	const TEST: &str = "Hello Rust community!";

	let content: String = String::from("");

	render!(p { content })
}
