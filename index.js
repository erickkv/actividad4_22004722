const boton = document.getElementById("boton");
const adv = document.getElementById("adv");
const tituloCbx = document.getElementById("titulo-cbx");
const autorCbx = document.getElementById("autor-cbx");
const yearCbx = document.getElementById("year-cbx");
const parametro = document.getElementById("select-parametro");
const parametroText = document.getElementById("parametroText");
const tableHead = document.getElementById("tableHead");
const tableData = document.getElementById("tableData");
const consultaBdBtn = document.getElementById("consultabd");
const guardarBtn = document.getElementById("guardar")
let fecha;
let informacionObtenida = null;

parametro.addEventListener('click', () => {
    autorCbx.checked = false;
    autorCbx.disabled = false;
    tituloCbx.checked = false;
    tituloCbx.disabled = false;
    yearCbx.checked = false;
    yearCbx.disabled = false;
    if (parametro.value === "autor") {
        autorCbx.checked = true;
        autorCbx.disabled = true;
    }
    if (parametro.value === "titulo") {
        tituloCbx.checked = true;
        tituloCbx.disabled = true;
    }
})

boton.addEventListener('click', () => {
    adv.innerHTML = "";
    if (parametro.value === "" || parametroText.value === "") {
        adv.innerHTML = "debe seleccionar búsqueda por AUTOR o por TITULO";
        guardarBtn.disabled = true;
        return;
    }
    fecha = new Date().toISOString().slice(0, 10);
    const autor = parametroText.value;
    informacionObtenida = null;
    if (parametro.value === "autor" && !tituloCbx.checked) {
        fetch(`https://openlibrary.org/search/authors.json?q=${autor}`)
            .then(res => res.json())
            .then(resJson => {
                tableHead.innerHTML = "";
                tableData.innerHTML = "";
                const autores = resJson.docs;
                if (autores.length < 1)  {
                    adv.innerHTML = "No se encontró ningún autor con el nombre especificado";
                    guardarBtn.disabled = true;
                    return;
                }
                informacionObtenida = [...autores];
                guardarBtn.disabled = false;
                tableHead.innerHTML += "<tr>" +
                                            "<th>" +"autor" + "</th>" +
                                        "</tr>";
                autores.forEach(autor => {
                    tableData.innerHTML += "<tr>" +
                                            "<td>" + autor.name + "</td>" +
                                        "</tr>";
                })
            })
    } else if (parametro.value === "autor" && tituloCbx.checked) {
        fetch(`https://openlibrary.org/search.json?author=${autor}&sort=new`)
            .then(res => res.json())
            .then(resJson => {
                tableHead.innerHTML = "";
                tableData.innerHTML = "";
                let datosLibros = resJson.docs;
                if (datosLibros.length < 1)  {
                    adv.innerHTML = "No se encontró ningún autor con el nombre especificado";
                    guardarBtn.disabled = true;
                    return
                }
                informacionObtenida = [...datosLibros];
                guardarBtn.disabled = false;
                console.log(datosLibros[0])
                if (!yearCbx.checked) {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Autor." + "</th>" +
                                                "<th>" +"Título." + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + (i + 1) + "</th>" +
                                                    "<td>" + libro.author_name[0] + "</td>" +
                                                    "<td>" + libro.title + "</td>" +
                                                "</tr>";
                    });
                } else {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Autor." + "</th>" +
                                                "<th>" +"Título." + "</th>" +
                                                "<th>" +"A&ntildeo." + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + (i + 1) + "</th>" +
                                                    "<td>" + libro.author_name[0] + "</td>" +
                                                    "<td>" + libro.title + "</td>" +
                                                    "<td>" + libro.first_publish_year + "</td>" +
                                                "</tr>";
                    });
                }

            });
    } else if (parametro.value === "titulo"){
        const titulo = parametroText.value
        fetch(`https://openlibrary.org/search.json?title=${titulo}`)
        .then(res => res.json())
        .then(resJson => {
            tableHead.innerHTML = "";
            tableData.innerHTML = "";
            let datosLibros = resJson.docs;
            if (datosLibros < 1)  {
                adv.innerHTML = "No se encontró ningún titulo con el nombre especificado";
                guardarBtn.disabled = true;
                return;
            }
            informacionObtenida = [...datosLibros];
            guardarBtn.disabled = false;
            if (!autorCbx.checked) {
                if(yearCbx.checked) {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                                "<th>" +"Año" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + (i + 1) + "</th>" +
                                                    "<td>" + libro.title + "</td>" +
                                                    "<td>" + libro.first_publish_year + "</td>" +
                                                "</tr>";
                    });
                } else {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + (i + 1) + "</th>" +
                                                    "<td>" + libro.title + "</td>" +
                                                "</tr>";
                });
                }
            } else {
                if(yearCbx.checked) {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Autor" + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                                "<th>" +"Año" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                "<th>" + (i + 1) + "</th>" +
                                                "<th>" + libro.author_name[0] + "</th>" +
                                                "<td>" + libro.title + "</td>" +
                                                "<td>" + libro.first_publish_year + "</td>" +
                                            "</tr>";
                    });
                } else {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Autor" + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                    tableData.innerHTML += "<tr>" +
                                                "<th>" + (i + 1) + "</th>" +
                                                "<th>" + libro.author_name[0] + "</th>" +
                                                "<td>" + libro.title + "</td>" +
                                            "</tr>";
                            });
                }
            }
        });
    }
})

consultaBdBtn.addEventListener('click', () => {
    tableHead.innerHTML = "";
    tableData.innerHTML = "";
    adv.innerHTML = "";
    informacionObtenida = null;
    if (parametro.value === "" || parametroText.value === "") {
        adv.innerHTML = "debe seleccionar búsqueda por AUTOR o por TITULO";
        return;
    }
    const argumento = parametroText.value;
    const campoSelec =parametro.value;
    guardarBtn.disabled = true;

    // SELECCIONADA BUSQUEDA POR AUTOR
    if (parametro.value === "autor") {
        window.comunicacion.consultarAutor([campoSelec, argumento]);
        window.comunicacion.recibirDatosBD(function(event, result) {
            tableHead.innerHTML = "";
            tableData.innerHTML = "";
            if (result.length < 1) adv.innerHTML = "No se encontró ningún autor con el nombre especificado"
            else {
                tableHead.innerHTML += "<tr>" +
                                            "<th>" +"No." + "</th>" +
                                            "<th>" +"Autor" + "</th>" +
                                            "<th>" +"Titulo" + "</th>" +
                                            "<th>" +"Año" + "</th>" +
                                            "<th>" +"Fecha consulta" + "</th>" +
                                        "</tr>";
                // si esta seleccionado solo autor y NO titulo entonces
                let index;
                if (!tituloCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        //crear una fila el html y meter id, autor y fecha consulta; aumentar indice
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + obj.autor + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                } else if (tituloCbx.checked && !yearCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + obj.autor + "</td>" +
                                                    "<td>" + obj.titulo + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                } else if (tituloCbx.checked && yearCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + obj.autor + "</td>" +
                                                    "<td>" + obj.titulo + "</td>" +
                                                    "<td>" + obj.year + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                }
            }
        })
    }

// SELECCIONADO BUSQUEDA POR TITULO:
    if (parametro.value === "titulo") {
        window.comunicacion.consultarTitulo([campoSelec, argumento]);
        window.comunicacion.recibirDatosBD(function(event, result) {
            tableHead.innerHTML = "";
            tableData.innerHTML = "";
            if (result.length < 1) adv.innerHTML = "No se encontró ningún título con el nombre especificado"
            else {
                tableHead.innerHTML += "<tr>" +
                                            "<th>" +"No." + "</th>" +
                                            "<th>" +"Autor" + "</th>" +
                                            "<th>" +"Titulo" + "</th>" +
                                            "<th>" +"Año" + "</th>" +
                                            "<th>" +"Fecha consulta" + "</th>" +
                                        "</tr>";
                // si esta seleccionado solo autor y NO titulo entonces
                let index;
                if (!autorCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        //crear una fila el html y meter id, autor y fecha consulta; aumentar indice
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + obj.titulo + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                } else if (autorCbx.checked && !yearCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + obj.autor + "</td>" +
                                                    "<td>" + obj.titulo + "</td>" +
                                                    "<td>" + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                } else if (autorCbx.checked && yearCbx.checked) {
                    index = 1;
                    result.forEach(obj => {
                        tableData.innerHTML += "<tr>" +
                                                    "<td>" + index + "</td>" +
                                                    "<td>" + obj.autor + "</td>" +
                                                    "<td>" + obj.titulo + "</td>" +
                                                    "<td>" + obj.year + "</td>" +
                                                    "<td>" + obj.fecha_ingreso + "</td>" +
                                                "</tr>";
                        index++;
                    })
                }
            }
        })
    }
})

guardarBtn.addEventListener('click', () => {
    if (!informacionObtenida || informacionObtenida.length < 1) {
        adv.innerHTML = "No hay información para guardar";
        return;
    }
    window.comunicacion.guardarDatos(informacionObtenida);
    window.comunicacion.datosAlmacenados(function(event, args) {
        alert(args);
    });
})
