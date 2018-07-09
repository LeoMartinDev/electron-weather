const { app, BrowserWindow } = require('electron');

function createWindow() {
  // permet de créer une fenêtre de navigateur (chrome)
  win = new BrowserWindow({
    width: 350,
    height: 375,
    resizable: false,
  });

  // ouvre les DevTools
  win.webContents.openDevTools();

  // dans la quelle nous chargeons le fichier index.html
  win.loadFile('index.html');
}

app.on('ready', createWindow);