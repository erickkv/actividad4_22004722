const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');

let ventana;

//crear conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'usuario1',
    password: 'password',
    database: 'consultas_actividad5'
});

function createWindow() {
    ventana = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    ventana.loadFile('index.html')
}

/* conexion.promise().query('SELECT * FROM consultas')
    .then(([result, fields]) => {
        console.log(result)
    })
    .catch(err => console.log(err)); */

ipcMain.on('consultarAutor', function(event, args) {
    conexion.promise().execute('SELECT * FROM consultas WHERE autor = ?', [args[1]])
    .then(([result, fields]) => {
        ventana.webContents.send('recibirDatosBD', result);
    })
    .catch(err => console.log(err));
})

app.whenReady().then(createWindow)



/* conexion.query(
    'SELECT * FROM consultas',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  ); */
