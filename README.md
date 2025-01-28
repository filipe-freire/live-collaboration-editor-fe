# 👨‍💻 Live Collaboration Editor!

## Introduction

This repo holds the Frontend for a proof of concept app that aims to demonstrate a possible implementation of a live collaboration feature in a Rich Text Editor environment, using the Web Sockets protocol.

Built to be used with [this backend](https://github.com/filipe-freire/live-collaboration-editor-be/)

## 🎁 Features

- A connection status indicator (so you know if the server is up or 💣🔥🚒);
- The total amount of concurrent users editing the document;
- Randomly assigned name on first connection (changeable by clicking on your name in the UI);
- RichText Editor like functionality provided by [TipTap](https://tiptap.dev/) (Headings, bold, italic, lists, typography selector, text & highlight color picker)
- Persisted changes across sessions (leveraging SQLite's power and might).

## 👩🏼‍💻 Development

This app was developed using [pnpm](https://pnpm.io/) as its main package manager. However, running it with `npm` _should_ not break functionality.

1. Clone [live-collaboration-editor-be](https://github.com/filipe-freire/live-collaboration-editor-be/) into your machine, go through the setup instructions and **make sure it is running!**
2. Clone this repository into another folder;
3. Run `pnpm install` or `npm install` in the project's root directory;
4. `pnpm dev` or `npm run dev` to launch the application in development mode;
5. Profit! 💰

### 🛠️ Tools

1. [React](https://react.dev/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Vite](https://vite.dev/)
4. [TipTap](https://tiptap.dev/)
5. [Tailwind](https://tailwindcss.com/)
6. [Lucide](https://lucide.dev)
