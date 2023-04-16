use dioxus::prelude::*;

pub fn display(cx: Scope) -> Element {
	const TEST: &str = "Hello Rust community!";

	let mut content: String = String::from("");

	render!(p { content })
}
