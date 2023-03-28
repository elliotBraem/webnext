use dioxus::prelude::*;

mod router;
mod routes;

fn main() {
	dioxus_web::launch(app_gui);
}

fn app_gui(cx: Scope) -> Element {
	render!(router::gui {})
}
