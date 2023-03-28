use {dioxus::prelude::*, dioxus_router::*};

fn main() {
	dioxus_web::launch(gui);
}

fn gui(cx: Scope) -> Element {
	render! (
			main {
					Router { Route { to: "/", p {} } }
			}
	)
}
