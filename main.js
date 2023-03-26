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
});

ipcMain.on('consultarTitulo', function(event, args) {
    conexion.promise().execute('SELECT * FROM consultas WHERE titulo = ?', [args[1]])
    .then(([result, fields]) => {
        ventana.webContents.send('recibirDatosBD', result);
    })
    .catch(err => console.log(err));
});

ipcMain.on('guardarDatos', function(event, args) {
    let fecha = new Date().toISOString().slice(0, 10);
    /* console.log(args[0]);
    console.log(fecha); */
    if (!('author_name' in args[0])) {
        args.forEach(autor => {
            conexion.promise().execute('INSERT INTO consultas (autor, fecha_ingreso) VALUES (?, ?)',
            [autor.name, fecha])
        });
        ventana.webContents.send('datosAlmacenados', 'Datos almacenados en la base de datos');
    } else {
        let autor;
        let year
        args.forEach(datosLibro => {
            if(!("author_name" in datosLibro)) {autor = "null";}
            else if(datosLibro.author_name.length < 1) {autor = "null";}
            else {autor = datosLibro.author_name[0];}
            if (!("first_publish_year" in datosLibro)) {year = null;}
            else if(!datosLibro.first_publish_year) {year = null;}
            else {year = datosLibro.first_publish_year}
            conexion.promise().execute('INSERT INTO consultas (autor, titulo, year, fecha_ingreso) VALUES (?, ?, ?, ?)',
            [autor, datosLibro.title, year, fecha])
        });
        ventana.webContents.send('datosAlmacenados', 'Datos almacenados en la base de datos');
    }

});

app.whenReady().then(createWindow)



/* conexion.query(
    'SELECT * FROM consultas',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  ); */
