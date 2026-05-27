# QuickDo ⚡

A minimal, always-on-top floating task widget for your desktop. Summon it instantly with a global keyboard shortcut, check off your tasks, and get back to work.

---

## Download

| Platform | Link |
|----------|------|
| Windows (.exe) | [Download for Windows](https://github.com/harikrsh10/QuickDo/releases/latest/download/QuickDo-Setup.exe) |
| macOS (.dmg) | [Download for macOS](https://github.com/harikrsh10/QuickDo/releases/latest/download/QuickDo.dmg) |

> Or browse all releases → [github.com/harikrsh10/QuickDo/releases](https://github.com/harikrsh10/QuickDo/releases)

---

## Features

- **Global shortcut** — `Alt+Q` to toggle the widget on top of any app
- **Tray icon** — lives in your system tray/menubar, right-click for options
- **Dark & light theme** — toggle with the sun/moon button in the header
- **Add tasks** — type and press `Enter`, or click the arrow button
- **Due times** — click the clock icon to set an optional deadline; badge turns amber when close, red when overdue
- **Timestamps** — each task shows when it was added; completed tasks show when they were done
- **Complete tasks** — tick the circle; completed tasks get a strikethrough and move to the Done tab
- **Remove tasks** — hover a task and click `×`
- **Tabs** — separate Todo and Done views
- **Progress bar** — visual completion tracking
- **Dynamic sizing** — window grows and shrinks with your task list
- **Confetti** — when you clear your entire to-do list 🎉
- **Persistent** — tasks saved locally, survive app restarts
- **New Day** — clear completed tasks with one click

---

## Run from source

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Install & Run

```bash
git clone https://github.com/harikrsh10/QuickDo.git
cd QuickDo
npm install
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
```

Built files appear in `dist/`.

> **Note**: macOS builds require signing for distribution outside the Mac App Store.

---

## Releasing a new version

1. Update the version in `package.json`
2. Push a tag — the GitHub Actions workflow builds and uploads automatically:

```bash
git tag v1.0.1
git push origin v1.0.1
```

---

## Customizing the shortcut

Open `src/main.js` and change the shortcut string:

```js
globalShortcut.register("Alt+Q", toggleWindow)
```

Valid modifier keys: `Command` / `Ctrl` / `CommandOrControl` / `Alt` / `Shift`

---

## Project structure

```
quickdo/
├── .github/workflows/  # CI — auto-builds on tag push
├── src/
│   ├── main.js         # Electron main process (window, tray, shortcuts)
│   ├── preload.js      # Context bridge (secure IPC)
│   ├── store.js        # File-based persistence
│   └── index.html      # Full UI (HTML + CSS + JS, no build step)
├── assets/             # App icons
└── package.json
```
