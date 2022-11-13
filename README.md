# akaia.run

A blockchain-powered cloud operating system.

## Development setup

### Infrastructure

#### Version manager

<https://asdf-vm.com/guide/getting-started.html>

### Architecture

#### Dependencies installation

```bash
asdf install
cargo install cargo-make
```

## web4 deploy

Using [near-cli-rs](https://near.cli.rs) you can deploy the contract to your account:

```bash
near-cli contract deploy web4.akaia.near use-file ./target/wasm32-unknown-unknown/release/near_akaia_promo.wasm without-init-call network-config mainnet
```
