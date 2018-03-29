console.log('Stix');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (planetArray) => {
    let domString = '';
    planetArray.forEach((planets)=>{
        domString += `<div id="card-container">`;
        domString +=    `<h1>${planets.name}</h1>`;
        domString += `</div>`;
    })
    printToDom(domString, 'planet-container');
};

function executeWhenCodeFails() {
    console.log('What happened, Stix?!');
};

function executeWhenPageLoads (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
};


const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeWhenPageLoads);
    myRequest.addEventListener('error', executeWhenCodeFails);
    myRequest.open('GET', 'planets.json');
    myRequest.send();
};

startApplication();