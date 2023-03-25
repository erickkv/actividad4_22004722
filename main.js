const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const mysql = require('mysql2');

let ventana;

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

app.whenReady().then(createWindow)

//crear conexion
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'usuario1',
    password: 'password',
    database: 'consultas_actividad5'
});

/* conexion.query(
    'SELECT * FROM consultas',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  ); */

conexion.promise().query('SELECT * FROM consultas')
    .then(
        ([result, fields]) => {
            console.log(result)
        }
    )
    .catch(err => console.log(err));
