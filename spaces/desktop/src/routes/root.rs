use {dioxus::prelude::*, rxrust::prelude::*, std::time::Duration};

pub fn render(cx: Scope) -> Element {
	const TEST: &str = "Hello Rust community!";

	let mut content: String = String::from("");

	render!(p { content })
}
