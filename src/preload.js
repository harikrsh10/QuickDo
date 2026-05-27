const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("quickdo", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  saveTasks: (tasks) => ipcRenderer.invoke("save-tasks", tasks),
  closeWindow: () => ipcRenderer.send("close-window"),
  dragWindow: (x, y) => ipcRenderer.send("drag-window", { x, y }),
  resizeWindow: (height) => ipcRenderer.send("resize-window", height),
});
