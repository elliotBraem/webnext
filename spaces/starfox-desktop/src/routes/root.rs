use dioxus::prelude::*;

pub fn display(cx: Scope) -> Element {
	const TEST: &str = "Hello Rust community!";

	let content: String = String::from(TEST);

	render!(p { class: "bg-red flex p-0", content })
}