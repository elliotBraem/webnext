// mod gui;

use near_sdk::{borsh::{self, BorshDeserialize, BorshSerialize},
               near_bindgen,
               serde::{Deserialize, Serialize}};

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {}

#[near_bindgen]
impl Contract {
	/// Learn more about web4 here: https://web4.near.page
	pub fn web4_get(&self, request: Web4Request) -> Web4Response {
		if request.path == "/" {
			Web4Response::Body {
				content_type: "text/html; charset=UTF-8".to_owned(),

				body: "
					<html class='{style.get_class_name()}'>
						<head>
							<meta charset='UTF-8' />
							<meta name='viewport' content='width=device-width, initial-scale='1.0' />

							<title>Akaia</title>
							<meta name='description' content='A blockchain operating system.' />
							<link rel='image_src' href='https://cloudflare-ipfs.com/ipfs/bafybeidayprq2jsd2w2z3oi5i7updwy7xep57zptmevcxwfsfl42udzz74' />

							<meta property='og:url' content='https://akaia.near.page/' />
							<meta property='og:type' content='website' />
							<meta property='og:title' content='akaia.near' />
							<meta property='og:description' content='A blockchain operating system.' />
							<meta property='og:image' content='https://cloudflare-ipfs.com/ipfs/bafybeidayprq2jsd2w2z3oi5i7updwy7xep57zptmevcxwfsfl42udzz74' />

							<meta name='twitter:card' content='summary_large_image' />
							<meta property='twitter:domain' content='akaia.near.page' />
							<meta property='twitter:url' content='https://akaia.near.page' />
							<meta name='twitter:title' content='akaia.near' />
							<meta name='twitter:description' content='A blockchain operating system.' />
							<meta name='twitter:image' content='https://cloudflare-ipfs.com/ipfs/bafybeidayprq2jsd2w2z3oi5i7updwy7xep57zptmevcxwfsfl42udzz74' />
						</head>
					</html>
				".as_bytes().to_owned().into()
			}
		} else {
			Web4Response::Body { content_type: "text/html; charset=UTF-8".to_owned(),
			                     body:
				                     format!("<h1>Route data:</h1><pre>{:#?}</pre>", request).into_bytes()
				                                                                             .into(), }
		}
	}
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Web4Request {
	#[serde(rename = "accountId")]
	pub account_id: Option<String>,
	pub path:       String,
	#[serde(default)]
	pub params:     std::collections::HashMap<String, String>,
	#[serde(default)]
	pub query:      std::collections::HashMap<String, Vec<String>>,
	pub preloads:   Option<std::collections::HashMap<String, Web4Response>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde", untagged)]
pub enum Web4Response {
	Body {
		#[serde(rename = "contentType")]
		content_type: String,
		body:         near_sdk::json_types::Base64VecU8,
	},
	BodyUrl {
		#[serde(rename = "bodyUrl")]
		body_url: String,
	},
	PreloadUrls {
		#[serde(rename = "preloadUrls")]
		preload_urls: Vec<String>,
	},
}

#[cfg(test)]
mod tests {
	#[test]
	fn it_works() {
		let result = 2 + 2;
		assert_eq!(result, 4);
	}
}
