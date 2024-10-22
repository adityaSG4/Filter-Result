let InputSerachEl = document.getElementById('searchInput');
let spinnerEl = document.getElementById('spinner');
let searchInputVal = '';

let mainContEl = document.getElementById('resultCountries');
let CD = []

function getcont(flag, name, population) {

    let contEl = document.createElement('div');
    contEl.classList.add('col-11', 'col-md-5', 'country-card', 'mr-auto', 'ml-auto', 'd-flex', 'flex-row');

    let imgEl = document.createElement('img');
    imgEl.src = flag;
    imgEl.classList.add("country-flag", "mt-auto", "mb-auto");
    contEl.appendChild(imgEl);

    let subContEl = document.createElement('div');
    subContEl.classList.add("d-block", "flex-column", "ml-4");

    let headingEl = document.createElement('h1');
    headingEl.textContent = name;
    headingEl.classList.add('country-name');
    subContEl.appendChild(headingEl);

    let paraEl = document.createElement('p');
    paraEl.textContent = population;
    paraEl.classList.add('country-population');
    subContEl.appendChild(paraEl);

    contEl.appendChild(subContEl);
    mainContEl.appendChild(contEl);
}

function check(CD) {
    mainContEl.innerHTML = '';
    for (let i of CD) {
        let country = i.name.toLowerCase();
        if (country.includes(searchInputVal.toLowerCase())) {
            let {
                flag,
                name,
                population
            } = i;
            getcont(flag, name, population);
        }
    }
}

function getCountries() {
    let option = {
        method: "GET"
    };

    mainContEl.textContent = "";
    spinnerEl.classList.remove("d-none");
    mainContEl.classList.add("d-none");

    fetch("https://apis.ccbp.in/countries-data", option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            mainContEl.classList.remove("d-none");
            CD = jsonData;
            check(CD);
        });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    getCountries();
}


getCountries();
InputSerachEl.addEventListener("keyup", onChangeSearchInput);