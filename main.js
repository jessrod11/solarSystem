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
        newDomString += `<button class="button">X</button>`;
        newDomString += `<h1>${planets.name}</h1>`;
        newDomString += `<img src="${planets.imageUrl}">`;
        newDomString += `<p>${planets.description}</p>`;
        newDomString += `<p>${planets.numberOfMoons}</p>`;
        newDomString += `<p>${planets.nameOfLargestMoon}</p>`;
        newDomString += `</div>`;
    })
       
    printToDom(newDomString, 'planet-container');
};

const cardHolder = document.getElementsByClassName('card-container');
const planetPics = document.getElementsByClassName('planetPics');
const planetNames = document.getElementsByClassName('planetNames');
const newCardDiv = document.getElementsByClassName('new-card');

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

    const hideContainer = () => {
        for (let e=0; e<newCardDiv; e++){
            newCardDiv[e].classList.add('hide');
        };
    };

    const onePlanet = () => {
        for (let w=0; w<cardHolder.length; w++){
            cardHolder[w].addEventListener('click', (event)=>{
                console.log('click',event);
                // if(event.target.localName === 'img'){
                //     newDom();
                // }
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
};

function executeNextCycle (){
    const data = JSON.parse(this.responseText);
    newDom(data.planets);
    hideContainer();
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

startApplication();
runNextCode();