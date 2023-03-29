# Fractal

A blockchain-powered cloud operating system and full-stack web4 application framework

## The only valid roadmap

**web2**: Centralized backend, centralized frontend, centralized AI

**web3**: Backend decentralized only for most critical parts, centralized frontend, centralized AI

\> you are here <

**web4**: Decentralized backend, decentralized frontend, centralized AI

**web5**: Decentralized backend, decentralized frontend, decentralized AI

**web6**: The Singularity

## Development setup

### Infrastructure

#### Version manager

<https://asdf-vm.com/guide/getting-started.html>

### Architecture

#### Basic dependencies installation

```bash
asdf install
cargo install cargo-make
```

#### Advanced development tools

```bash
cargo install cargo-modules
```

#### Framework specification

## web4 deploy

Using [near-cli-rs](https://near.cli.rs) you can deploy the contract to your account:

```bash
near-cli contract deploy web4.akaia.near use-file ./target/wasm32-unknown-unknown/release/near_akaia_promo.wasm without-init-call network-config mainnet
```
