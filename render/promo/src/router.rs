use {dioxus::prelude::*, dioxus_router::*, root};

pub mod router {
	pub fn gui(cx: Scope) -> Element {
		render! (
				Router {
						Route { to: "/", root:: {} }
				}
		)
	}
}
