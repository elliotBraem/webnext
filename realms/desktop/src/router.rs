use {crate::routes, dioxus::prelude::*, dioxus_router::*};

pub fn r_gui(cx: Scope) -> Element {
	render! (
			Router {
					Route { to: "/", routes::root::gui {} }
			}
	)
}
