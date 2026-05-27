# QuickDo ⚡

A minimal, always-on-top floating task widget for your desktop. Summon it instantly with a global keyboard shortcut, check off your tasks, and get back to work.

---

## Features

- **Global shortcut** — `Ctrl+Shift+Space` (Win/Linux) / `Cmd+Shift+Space` (Mac) to toggle the widget on top of any app
- **Tray icon** — lives in your system tray/menubar, right-click for options
- **Add tasks** — type and press `Enter`, or click `+`
- **Complete tasks** — tick the checkbox; completed tasks get a strikethrough and move to the Done tab
- **Remove tasks** — hover a task and click `×`
- **Tabs** — separate To-do and Done views
- **Progress bar** — visual completion tracking
- **Animated** — smooth slide-in/out and completion animations
- **Confetti** — when you clear your entire to-do list 🎉
- **Persistent** — tasks saved locally, survive app restarts
- **New Day** — clear completed tasks with one click

---

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Install & Run

```bash
# Install dependencies
npm install

# Start in development
npm start
```

---

## Build (distributable)

```bash
# Windows (.exe installer + portable)
npm run build:win

# macOS (.dmg)
npm run build:mac

# Linux (.AppImage + .deb)
npm run build:linux

# All platforms (requires macOS for mac builds)
npm run build:all
```

Built files appear in `dist/`.

> **Note**: macOS builds require signing for distribution. Set up your Apple Developer certificate or build for local use with `--skip-notarize`.

---

## Customizing the shortcut

Open `src/main.js` and change the shortcut string:

```js
globalShortcut.register("CommandOrControl+Shift+Space", toggleWindow)
```

Valid modifier keys: `Command` / `Ctrl` / `CommandOrControl` / `Alt` / `Shift`

---

## Tray icon

Place your icon files at:
- `assets/icon.ico` (Windows)
- `assets/icon.icns` (macOS)
- `assets/icon.png` (Linux, 512×512px)
- `assets/tray-icon.png` (16×16px tray icon, all platforms)

If icons are missing, the app still works — tray icon will be blank.

---

## Project structure

```
quickdo/
├── src/
│   ├── main.js        # Electron main process (window, tray, shortcuts)
│   ├── preload.js     # Context bridge (secure IPC)
│   ├── store.js       # File-based persistence
│   └── index.html     # Full UI (HTML + CSS + JS, no build step)
├── assets/            # App icons
└── package.json
```
