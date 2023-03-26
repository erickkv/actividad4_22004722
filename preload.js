const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        consultarAutor: (args) => ipcRenderer.send('consultarAutor', args),

        recibirDatosBD: (callback) => ipcRenderer.on('recibirDatosBD', callback)
    }
)
