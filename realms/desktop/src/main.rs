use dioxus::prelude::*;

mod router;
mod routes;

fn main() {
	wasm_logger::init(wasm_logger::Config::default());
	dioxus_web::launch(realm_render);
}

fn realm_render(cx: Scope) -> Element {
	render!( router::render {} )
}
