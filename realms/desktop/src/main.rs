use dioxus::prelude::*;

mod router;
mod routes;

fn main() {
	wasm_logger::init(wasm_logger::Config::default());
	dioxus_web::launch(app_gui);
}

fn app_gui(cx: Scope) -> Element {
	render!(router::r_gui {})
}
