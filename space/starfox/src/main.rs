#![allow(non_snake_case)]
use {dioxus::prelude::*, dioxus_router::*};

mod routes;

fn main() {
	wasm_logger::init(wasm_logger::Config::default());
	dioxus_web::launch(Desktop);
}

fn Desktop(cx: Scope) -> Element {
	render!( DesktopRouter {} )
}

fn DesktopRouter(cx: Scope) -> Element {
	render! (
    Router {
        Route { to: "/", routes::root::page {} }
    }
)
}
