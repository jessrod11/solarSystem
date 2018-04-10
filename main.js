let selectedImg = '';

const cardHolder = document.getElementsByClassName('card-container');
const planetPics = document.getElementsByClassName('planetPics');
const planetNames = document.getElementsByClassName('planetNames');
const newCardDiv = document.getElementsByClassName('new-card');
const button = document.getElementsByClassName('button');
const inputField = document.getElementById('input-field');
const picIndex = document.getElementById('pic${planets.indexOf}');

const pageLoad = () => {
    startApplication();
};

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (planetArray) => {
    let domString = '';
    planetArray.forEach((planets)=>{
        domString += `<div class="card-container">`;
        domString +=    `<h1 class="planetNames">${planets.name}</h1>`;
        domString +=    `<img class="planetPics" src= ${planets.imageUrl}>`;
        domString += `</div>`;
    })
    printToDom(domString, 'planet-container');
};

const newDom = (cards) => {
    let newDomString = '';
    cards.forEach((planets)=>{
        newDomString += `<div class="new-card">`;
        // newDomString += `<div class="new-card hide">`;
        newDomString += `<button class="button">X</button>`;
        newDomString += `<h1 class="new-name">${planets.name}</h1>`;
        newDomString += `<img id="pic${planets.indexOf}" src="${planets.imageUrl}">`;
        newDomString += `<p>${planets.description}</p>`;
        newDomString += `<h2>Number of Moons: ${planets.numberOfMoons}</h2>`;
        newDomString += `<h2>Name of Largest Moon: ${planets.nameOfLargestMoon}</h2>`;
        newDomString += `</div>`;
    });
    printToDom(newDomString, 'planet-container');
    buttonEvent();
};

const hideImage = () => {
    for (let i=0; i<planetPics.length; i++){
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
    for (let m=0; m < cardHolder.length; m++){
        cardHolder[m].addEventListener('mouseenter', (event)=> {
            if(event.target.className === 'card-container'){
                showMe(event);
                hideTitle(event);
            } 
        });
    };
};

const backToNormal = () => {
    for(let a=0; a < cardHolder.length; a++){
        cardHolder[a].addEventListener('mouseleave', (event)=>{
            if(event.target.className === 'card-container'){
                addTitle(event);
                hideImage(event);
                }
            });
        };
    };

    const onePlanet = (cards) => {
        for (let w=0; w<cardHolder.length; w++){
            cardHolder[w].addEventListener('click', (event)=>{
                console.log('click',event);
                if (event.target.localName === 'img'){
                    runNextCode();
                }
            });
        }
    }

    const buttonEvent = () => {
        for(let e=0; e<button.length; e++){
            button[e].addEventListener('click', (event)=>{
                console.log('button event', event);
                if(event.target.className === 'button'){
                    pageLoad();
                }
                
            })
        }
    }

function executeWhenCodeFails() {
    console.log('What happened, Stix?!');
};

function executeWhenPageLoads (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
    hideImage();
    showImage();
    backToNormal();
    onePlanet();
    searchInput();
};

function executeNextCycle (){
    const data = JSON.parse(this.responseText);
    newDom(data.planets);  
};

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeWhenPageLoads);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();
};

const runNextCode = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeNextCycle);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();
};

startApplication ();