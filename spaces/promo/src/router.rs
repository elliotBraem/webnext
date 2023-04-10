use {crate::routes, dioxus::prelude::*, dioxus_router::*};

pub fn gui(cx: Scope) -> Element {
	render! (
			Router {
					Route { to: "/", routes::root::render {} }
			}
	)
}
