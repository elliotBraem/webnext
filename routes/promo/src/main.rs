use dioxus::prelude::*;

mod router;
mod routes;

fn main() {
	dioxus_web::launch(gui);
}

fn gui(cx: Scope) -> Element {
	render!(router::gui {})
}
