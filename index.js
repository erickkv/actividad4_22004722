const boton = document.getElementById("boton");
const adv = document.getElementById("adv");
const tituloCbx = document.getElementById("titulo-cbx");
const autorCbx = document.getElementById("autor-cbx");
const yearCbx = document.getElementById("year-cbx");
const parametro = document.getElementById("select-parametro");
const parametroText = document.getElementById("parametroText");
const tableHead = document.getElementById("tableHead");
const tableData = document.getElementById("tableData");

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
        return;
    }
    if (parametro.value === "autor") {
        const autor = parametroText.value.toString().split().join("_");
        fetch(`https://openlibrary.org/search.json?author=${autor}&sort=new`)
            .then(res => res.json())
            .then(resJson => {
                tableHead.innerHTML = "";
                tableData.innerHTML = "";
                const datosAutor = resJson.docs[0].author_name[0];
                if (!tituloCbx.checked) {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"autor" + "</th>"
                                            "</tr>";
                    tableData.innerHTML += "<tr>" +
                                                "<td>" + datosAutor + "</td>"
                                            "</tr>";
                } else if (tituloCbx.checked) {
                    let datosLibros = resJson.docs;
                    if (!yearCbx.checked) {
                        tableHead.innerHTML += "<tr>" +
                                                    "<th>" +"No." + "</th>" +
                                                    "<th>" +"Autor." + "</th>" +
                                                    "<th>" +"Título." + "</th>" +
                                                "</tr>";
                        datosLibros.forEach((libro, i) => {
                            tableData.innerHTML += "<tr>" +
                                                        "<th>" + i + "</th>" +
                                                        "<td>" + datosAutor + "</td>" +
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
                                                        "<th>" + i + "</th>" +
                                                        "<td>" + datosAutor + "</td>" +
                                                        "<td>" + libro.title + "</td>" +
                                                        "<td>" + libro.publish_year[0] + "</td>" +
                                                    "</tr>";
                        });

                    }
                }

            })
    } else if (parametro.value === "titulo"){
        const titulo = parametroText.value.toString().split().join("_");
        fetch(`https://openlibrary.org/search.json?title=${titulo}`)
        .then(res => res.json())
        .then(resJson => {
            tableHead.innerHTML = "";
            tableData.innerHTML = "";
            let datosLibros = resJson.docs;
            if (!autorCbx.checked) {
                if(yearCbx.checked) {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                                "<th>" +"Año" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + i + "</th>" +
                                                    "<td>" + libro.title + "</td>" +
                                                    "<td>" + libro.publish_year[0] + "</td>" +
                                                "</tr>";
                    });
                } else {
                    tableHead.innerHTML += "<tr>" +
                                                "<th>" +"No." + "</th>" +
                                                "<th>" +"Titulo" + "</th>" +
                                            "</tr>";
                    datosLibros.forEach((libro, i) => {
                        tableData.innerHTML += "<tr>" +
                                                    "<th>" + i + "</th>" +
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
                                                "<th>" + i + "</th>" +
                                                "<th>" + libro.author_name[0] + "</th>" +
                                                "<td>" + libro.title + "</td>" +
                                                "<td>" + libro.publish_year[0] + "</td>" +
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
                                                "<th>" + i + "</th>" +
                                                "<th>" + libro.author_name[0] + "</th>" +
                                                "<td>" + libro.title + "</td>" +
                                            "</tr>";
                            });
                }
            }
        });
    }
})
