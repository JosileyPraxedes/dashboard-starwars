// document.getElementById('personagens').innerHTML = 11;

const personagensContador = document.getElementById("personagens");
const navesContator = document.getElementById("naves");
const planetasContator = document.getElementById("planetas");
const luasContator = document.getElementById("luas");

personagensContatores();
preencherTabela();

function personagensContatores() {
    Promise.all([
        swapiGet("people/"), 
        swapiGet("starships/"),
        swapiGet("planets/"),
        swapiGet("vehicles/")
    ]).then(function(results) {

        personagensContador.innerHTML = results[0].data.count;
        navesContator.innerHTML = results[1].data.count;
        planetasContator.innerHTML = results[2].data.count;
        luasContator.innerHTML = results[3].data.count;
    });
}

// maneira 2
async function preencherTabela() {
    
    const response = await swapiGet("films/");
    const tableData = response.data.results;
    tableData.forEach((film) => {
        $("#filmsTable").append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`);
    });
}

function swapiGet(param) {
return axios.get(`https://swapi.dev/api/${param}`);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
    const response = await swapiGet('vehicles/');
    const vehiclesArray = response.data.results;
    console.log(vehiclesArray)

    const dataArray = [];
    dataArray.push(["Veículos", "Passageiros"]);
    console.log(dataArray);
    vehiclesArray.forEach(vehicles =>{
        dataArray.push([vehicles.name, Number(vehicles.passengers)])
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: 'Maiores veículos',
        legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}