personagensContadores();
preencherTabela();

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}

const personagensContador = document.getElementById("personagens");
const maleContador = document.getElementById("male");
const femaleContador = document.getElementById("female");
const droidContador = document.getElementById("droids");

// Cards - pegando quantidade de personagens e separando por gênero usando filter
async function personagensContadores() {
    const response = await swapiGet('people/');
    const peopleArray = response.data.results;
    const numberPeople = peopleArray
    .filter(p => p.name).length
    personagensContador.innerHTML = numberPeople;

    // masculinos
    const maleArray = response.data.results;
    const genderMale = maleArray
    .filter(p => p.gender === 'male').length
    maleContador.innerHTML = genderMale;

    // femininos
    const femaleArray = response.data.results;
    const femalesMale = femaleArray
    .filter(p => p.gender === 'female').length
    femaleContador.innerHTML = femalesMale;

    // droids
    const droidArray = response.data.results;
    const droidsArray = droidArray
    .filter(p => p.gender === 'n/a').length
    droidContador.innerHTML = droidsArray;
}


// Lista
async function preencherTabela() {
    const response = await swapiGet('people/')
    const tableData = response.data.results;
    console.log(tableData);
    tableData.forEach((people) => {
        $("#peopleTable").append(`
            <tr>
                <td>${people.name}</td>
                <td>${people.gender}</td>
                <td>${people.birth_year}</td>
                <td>${people.skin_color}</td>
            </tr>
        `);
    });
}