# Akaia Starfox

An advanced cross-platform embeddable NEAR BOS Gateway

## The only valid roadmap

**web2**: Centralized backend, centralized frontend, centralized AI

**web3**: Backend decentralized only for most critical parts, centralized frontend, centralized AI

\> you are here <

**web4**: Decentralized backend, decentralized frontend, centralized AI

**webnext**: Decentralized backend, decentralized frontend, decentralized AI

**versioning becomes meaningless**: The Singularity

## Development setup

### Infrastructure

#### Version manager

<https://asdf-vm.com/guide/getting-started.html>

### Architecture

#### Basic dependencies installation

```bash
asdf install && cargo install cargo-make
```

#### Advanced development tools

```bash
rustup component add clippy && cargo install cargo-modules
```

#### Fractality framework specification

A full-stack web4 application framework inspired by DDD, Fractal Design, and Hexagonal Architecture

## web4 deploy

Using [near-cli-rs](https://near.cli.rs) you can deploy the contract to your account:

```bash
near-cli contract deploy web4.akaia.near use-file ./target/wasm32-unknown-unknown/release/akaia-promo.wasm without-init-call network-config mainnet
```
