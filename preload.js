const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        consultarAutor: (args) => ipcRenderer.send('consultarAutor', args),

        consultarTitulo: (args) => ipcRenderer.send('consultarTitulo', args),

        recibirDatosBD: (callback) => ipcRenderer.on('recibirDatosBD', callback),

        guardarDatos: (args) => ipcRenderer.send('guardarDatos', args),

        datosAlmacenados: (callback) => ipcRenderer.on('datosAlmacenados', callback)
    }
)
