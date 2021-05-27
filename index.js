// document.getElementById('personagens').innerHTML = 11;

const personagensContator = document.getElementById("personagens");
const navesContator = document.getElementById("naves");
const planetasContator = document.getElementById("planetas");
const luasContator = document.getElementById("luas");

personagensContatores();

function personagensContatores() {
    Promise.all([
        swapiGet("people/"), 
        swapiGet("starships/"),
        swapiGet("planets/"),
        swapiGet("vehicles/")
    ]).then(function(results) {
        console.log(results);

        personagensContator.innerHTML = results[0].data.count;
        navesContator.innerHTML = results[1].data.count;
        planetasContator.innerHTML = results[2].data.count;
        luasContator.innerHTML = results[3].data.count;
    });
}

// maneira 2
async function preencherTabela() {
    const responde = await swapiGet("films/");
    console.log(response);
}

function swapiGet(param) {
    // Make a request for a user with a given ID
    return axios.get(`https://swapi.dev/api/${param}`);
}