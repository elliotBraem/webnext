use dioxus::prelude::*;

mod router;
mod routes;

fn main() {
	wasm_logger::init(wasm_logger::Config::default());
	dioxus_web::launch(space_render);
}

fn space_render(cx: Scope) -> Element {
	render!(router::render {})
}
