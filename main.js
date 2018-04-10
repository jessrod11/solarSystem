let selectedImg = '';

const cardHolder = document.getElementsByClassName('card-container');
const planetPics = document.getElementsByClassName('planetPics');
const planetNames = document.getElementsByClassName('planetNames');
const newCardDiv = document.getElementsByClassName('new-card');
const button = document.getElementsByClassName('button');
const inputField = document.getElementById('input-field');
const picIndex = document.getElementById('pic${planets.indexOf}');

const searchField = (planet) => {

    inputField.addEventListener('keypress', function (event) {
        console.log("event", event);
        if (event.key === 'Enter') {
            var txt = inputField.value;
            //1. filter planets array
            var results = planets.filter(function (thing) {
                console.log("filter thing", thing);
                return thing.name.indexOf(txt) > -1;
            })
            buildDomString(results);
        }
    })
}

const pageLoad = () => {
    startApplication();
};

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (planetArray) => {
    let domString = '';
    planetArray.forEach((planets) => {
        domString += `<div class="card-container">`;
        domString += `<h1 class="planetNames">${planets.name}</h1>`;
        domString += `<img class="planetPics" data-img-id=${planets.id} src= ${planets.imageUrl}>`;
        domString += `</div>`;
    })
    printToDom(domString, 'planet-container');
};

const selectImg = (e) => {
    selectedImg = e.target.dataset.imgId;
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeNextCycle);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();

    function executeNextCycle() {
        const data = JSON.parse(this.responseText).planets;
        data.forEach((planet) => {
            if (planet.id === selectedImg) {
                newDom(planet);
            }
        })
    };
}

const newDom = (planet) => {
    let newDomString = '';
    newDomString += `<div id="new-card">`;
    newDomString += `<button class="button">X</button>`;
    newDomString += `<h1 class="new-name">${planet.name}</h1>`;
    newDomString += `<img id="pic${planet.indexOf}" src="${planet.imageUrl}">`;
    newDomString += `<p>${planet.description}</p>`;
    newDomString += `<h2>Number of Moons: ${planet.numberOfMoons}</h2>`;
    newDomString += `<h2>Name of Largest Moon: ${planet.nameOfLargestMoon}</h2>`;
    newDomString += `</div>`;
    printToDom(newDomString, 'planet-container');
    buttonEvent();
};

const hideImage = () => {
    for (let i = 0; i < planetPics.length; i++) {
        planetPics[i].classList.add('hide');
    };
};

const showMe = (e) => {
    e.target.lastChild.classList.remove('hide');
}

const hideTitle = (e) => {
    e.target.firstChild.classList.add('hide');
};

const addTitle = (e) => {
    e.target.firstChild.classList.remove('hide');
}

const showImage = () => {
    for (let m = 0; m < cardHolder.length; m++) {
        cardHolder[m].addEventListener('mouseenter', (event) => {
            if (event.target.className === 'card-container') {
                showMe(event);
                hideTitle(event);
            }
        });
    };
};

const backToNormal = () => {
    for (let a = 0; a < cardHolder.length; a++) {
        cardHolder[a].addEventListener('mouseleave', (event) => {
            if (event.target.className === 'card-container') {
                addTitle(event);
                hideImage(event);
            }
        });
    };
};

const clickOneCard = () => {
    for (let w = 0; w < cardHolder.length; w++) {
        cardHolder[w].addEventListener('click', selectImg);
    }
};
const buttonEvent = () => {
    for (let e = 0; e < button.length; e++) {
        button[e].addEventListener('click', (event) => {
            console.log('button event', event);
            if (event.target.className === 'button') {
                pageLoad();
            }

        })
    }
}
function executeWhenCodeFails() {
    console.log('What happened, Stix?!');
};

function executeWhenPageLoads() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
    hideImage();
    showImage();
    backToNormal();
    clickOneCard();
    searchField();
};

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeWhenPageLoads);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();
};

startApplication();