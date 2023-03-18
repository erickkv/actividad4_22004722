const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let ventana;

function createWindow() {
    ventana = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana.loadFile('index.html')
}

app.whenReady().then(createWindow)
