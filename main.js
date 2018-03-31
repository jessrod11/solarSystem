console.log('Stix');

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

const cardHolder = document.getElementsByClassName('card-container');
const planetPics = document.getElementsByClassName('planetPics');
const planetNames = document.getElementsByClassName('planetNames');


const hideImage = () => {
    for (let i=0; i<planetPics.length; i++){
        planetPics[i].classList.add('hide');
    };
};

const showMe = (e) => {
    e.target.nextSibling.classList.remove('hide');
}

const hideTitle = (e) => {
    e.target.classList.add('hide');
};

const removeImg = (e) => {

}

const addTitle = (e) => {
    e.target.firstChild.classList.remove('hide');

}

const showImage = () => {
    for (let m=0; m < planetNames.length; m++){
        planetNames[m].addEventListener('mouseover', (event)=> {
            if(event.target.className === 'planetNames'){
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
};


const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeWhenPageLoads);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();
};

startApplication();