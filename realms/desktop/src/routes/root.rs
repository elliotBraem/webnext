use {dioxus::prelude::*, rxrust::prelude::*};

pub fn render(cx: Scope) -> Element {
	const TEST: &'static str = "Hello Rust community";

	let mut content: String = "".to_string();

	let numbers = observable::from_iter(0 .. 10);
	// create an even stream by filter
	let even = numbers.clone().filter(|v| v % 2 == 0);
	// create an odd stream by filter
	let odd = numbers.clone().filter(|v| v % 2 != 0);

	// merge odd and even stream again
	even.merge(odd).subscribe(|v| content = format!("{v}. {TEST}"));

	render!(p { content })
}
