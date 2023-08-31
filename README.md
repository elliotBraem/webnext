# 🪐 webnext

A proof of concept on Akaia's vision of the future web.

Implemented as git superproject and contains both development / infrastructure tools and the source code.

## Roadmap

**web2**: Centralized backend, centralized frontend, centralized AI

**web3**: Backend decentralized only for most critical parts, ( sometimes ) decentralized frontend, centralized AI

\> you are here <

**web4**: Decentralized backend, decentralized frontend, partially decentralized AI, centralized networking

**webnext**: Decentralized backend, decentralized frontend, decentralized AI, decentralized networking

**versioning becomes meaningless**: The Singularity

## Development setup

### Infrastructure

#### Runtime manager

<https://asdf-vm.com/guide/getting-started.html>

### Architecture

#### Basic dependencies installation

```bash
asdf install && cargo install cargo-make
corepack enable && corepack prepare pnpm@latest --activate
```

#### Advanced development tools

```bash
rustup component add clippy && cargo install cargo-modules
```
