# ProriseChat

![Logo placeholder](client/assets/favicon.svg)

> Zero-knowledge end-to-end encrypted chat, built for Cloudflare Workers with real-time Durable Objects.

🌐 **[中文版 README](README.md)**

## 🏅 Badges

<!-- Build Status -->
[![Build](https://img.shields.io/github/actions/workflow/status/shuaiplus/ProriseChat/docker-image.yml?branch=main&label=build)](https://github.com/shuaiplus/ProriseChat/actions)
<!-- Release -->
[![Release](https://img.shields.io/github/v/release/shuaiplus/ProriseChat)](https://github.com/shuaiplus/ProriseChat/releases)
<!-- License -->
[![License](https://img.shields.io/github/license/shuaiplus/ProriseChat)](LICENSE)
<!-- Coverage TODO -->
![Coverage](https://img.shields.io/badge/coverage-pending-lightgrey)
<!-- Downloads -->
[![Downloads](https://img.shields.io/github/downloads/shuaiplus/ProriseChat/total)](https://github.com/shuaiplus/ProriseChat/releases)

## 🎬 Demo

> TODO: Insert a GIF or screenshot (≤5MB) showing room creation, password join, and private chat flow.

## ✨ Features

- 🔒 End-to-end, zero-knowledge: all crypto stays in the browser; server only relays ciphertext.
- ⚡ Instant rollout: one-command Cloudflare Workers deployment with static assets prewired.
- 🛰️ Durable Objects rooms: tracks members and broadcasts lists in real time.
- 🧩 Stateless by design: no database writes; messages live in memory only for forward secrecy.
- 🎨 Frontend-only UI: ES modules + Vite build; themes, emojis, images, and file sharing included.

## 🚀 Quick Start (3 commands)

```bash
pnpm install
pnpm run dev
start http://localhost:8787
```

Open the URL to try the encrypted room locally.

## 📦 Installation & Deployment

### Prerequisites
- Node.js >= 18
- pnpm >= 8 (npm/yarn work with equivalent commands)
- Cloudflare account with `wrangler` logged in (`pnpm dlx wrangler login`)

### Local Development
```bash
git clone https://github.com/shuaiplus/ProriseChat.git
cd ProriseChat
pnpm install
pnpm run dev
```
Serves at `http://localhost:8787` by default.

### Cloudflare Workers Deploy
```bash
pnpm run build
pnpm run deploy
```
`wrangler.toml` already binds static assets as `ASSETS` and Durable Object `CHAT_ROOM`; adjust routes/domains as needed.

### Docker Deploy
```bash
docker run -d --name ProriseChat -p 80:80 ghcr.io/shuaiplus/ProriseChat
```
Use HTTPS via your reverse proxy; browsers may block key exchange on plain HTTP.

### Auto-sync fork (for long-term maintenance)
Fork the repo, enable GitHub Actions, and Cloudflare will redeploy automatically when upstream updates sync to your fork.

## 🛠️ Usage

1) Open the page, enter a room name and password to create/join.  
2) Share room name + password with peers; both sides complete key agreement.  
3) Click avatars to start end-to-end encrypted private chats; member list updates live.  
4) Send text, emojis, images, and files; no history is stored, so newcomers cannot backread.

## 📑 API / Protocol

| Type | Path | Description |
| --- | --- | --- |
| HTTP | `/` | Static app served by `ASSETS` binding |
| HTTP | `/api/*` | Reserved placeholder; currently returns `{ ok: true }` |
| WS | `GET /` (Upgrade) | Upgrades to WebSocket handled by Durable Object `ChatRoom` |

### Message Flow (summary)
- On connect: RSA-2048 server identity check → P-384 ECDH transport key.  
- Room join: client sends room identifier; server tracks members and broadcasts the list.  
- Client-to-client: Curve25519-derived shared key XOR room password → ChaCha20 encrypt payload; server never decrypts.

## 🤝 Contributing

Issues and PRs are welcome. Please discuss major changes first and ensure local build/dev works.  
(If needed, add `CONTRIBUTING.md` to document branch strategy, testing, and style.)

## 📄 License

ISC License. See [`LICENSE`](LICENSE).

