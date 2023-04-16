#![allow(non_snake_case)]
use {dioxus::prelude::*, dioxus_router::*};

mod routes;

fn main() {
	wasm_logger::init(wasm_logger::Config::default());
	dioxus_web::launch(Promo);
}

fn Promo(cx: Scope) -> Element {
	render!(PromoRouter {})
}

fn PromoRouter(cx: Scope) -> Element {
	render! (
			Router {
					Route { to: "/", routes::root::display {} }
			}
	)
}
