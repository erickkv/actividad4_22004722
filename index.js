let boton = document.getElementById("boton");
let fact = document.getElementById("fact");

boton.addEventListener('click', () => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(res => res.json())
        .then(resJson => fact.innerHTML = resJson["text"])
})
