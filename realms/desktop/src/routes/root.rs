use {dioxus::prelude::*, rxrust::prelude::*, std::time::Duration};

pub fn render(cx: Scope) -> Element {
	const TEST: &'static str = "Hello Rust community";

	let mut content: String = "".to_string();
	let threads_scheduler = FuturesThreadPoolScheduler::new().unwrap();

	let numbers = observable::from_iter(0 .. 10);
	// create an even stream by filter
	let even = numbers.clone().filter(|v| v % 2 == 0);
	// create an odd stream by filter
	let odd = numbers.clone().filter(|v| v % 2 != 0);

	// merge odd and even stream again
	even.merge(odd)
	    .delay(Duration::new(0, 3000), threads_scheduler)
	    .subscribe(|v| content = format!("{v}. {TEST}"));

	render!(p { content })
}
