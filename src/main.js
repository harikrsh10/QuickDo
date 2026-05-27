const {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  Menu,
  ipcMain,
  screen,
  nativeImage,
  shell,
} = require("electron");
const path = require("path");
const Store = require("./store");

// Single instance lock — prevents multiple tray icons
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

let mainWindow;
let tray;
const store = new Store();

function createWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 380,
    height: 260,
    x: screenWidth - 400,
    y: screenHeight - 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("blur", () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createTray() {
  const iconPath = path.join(__dirname, "..", "assets", "tray-icon.png");
  let trayIcon;

  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      trayIcon = createFallbackIcon();
    }
  } catch (e) {
    trayIcon = createFallbackIcon();
  }

  tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show QuickDo",
      click: () => toggleWindow(),
    },
    { type: "separator" },
    {
      label: "Shortcut: Alt+Q",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip("QuickDo — Press Alt+Q");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => toggleWindow());
}

function createFallbackIcon() {
  const size = 16;
  const icon = nativeImage.createEmpty();
  return icon;
}

function toggleWindow() {
  if (!mainWindow) {
    createWindow();
    mainWindow.once("ready-to-show", () => {
      positionAndShow();
    });
    return;
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    positionAndShow();
  }
}

function positionAndShow() {
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
  const [w, h] = mainWindow.getSize();
  mainWindow.setPosition(sw - w - 20, sh - h - 20);
  mainWindow.setSkipTaskbar(true);
  mainWindow.show();
  mainWindow.focus();
}

app.whenReady().then(() => {
  app.setAppUserModelId("com.quickdo.app"); // prevents taskbar grouping on Windows
  createWindow();
  createTray();

  const shortcutRegistered = globalShortcut.register("Alt+Q", toggleWindow);

  if (!shortcutRegistered) {
    console.log("Could not register Alt+Q shortcut");
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // Don't quit — keep tray alive
  }
});

ipcMain.handle("get-tasks", () => {
  return store.get("tasks") || [];
});

ipcMain.handle("save-tasks", (_, tasks) => {
  store.set("tasks", tasks);
  return true;
});

ipcMain.on("close-window", () => {
  if (mainWindow) mainWindow.hide();
});

ipcMain.on("resize-window", (_, contentHeight) => {
  if (!mainWindow) return;
  const MIN_H = 230;
  const MAX_H = 480;
  const newH = Math.max(MIN_H, Math.min(MAX_H, Math.round(contentHeight)));
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setSize(380, newH);
  mainWindow.setPosition(sw - 380 - 20, sh - newH - 20);
});

ipcMain.on("drag-window", (_, { x, y }) => {
  if (mainWindow) mainWindow.setPosition(x, y);
});
