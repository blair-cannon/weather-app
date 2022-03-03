const helperText = document.querySelector('#helperText');
const weatherContainer = document.querySelector('#weatherContainer'); // id in html
const zipcodeInput = document.querySelector('#zipcodeInput');
const header = document.querySelector('#header');
const button = document.querySelector('#button');
const headWrapper = document.querySelector('#headWrapper');
// const cityP = document.createElement('p');
// const temperatureP = document.createElement('p');
// const conditionP = document.createElement('p');
const cityP = document.querySelector('#cityP');
const temperatureP1 = document.querySelector('#temperatureP1');
const temperatureP2 = document.querySelector('#temperatureP2');
const temperatureP3 = document.querySelector('#temperatureP3');
const conditionP = document.querySelector('#conditionP');
const card1 = document.querySelector('#card1');
const card2 = document.querySelector('#card2');
const card3 = document.querySelector('#card3');




const key = '94017407c1b8e8bc75ac701e2dbb7042';
let userZip;
let weatherLink;
let weatherData = [];
let weatherState = {
    city: [],
    tempK: [],
    tempF: [],
    tempC: [],
    condition: []
}


function init () {
    card1.hidden = true;
    card2.hidden = true;
    card3.hidden = true;
    helperText.hidden = true;
    // header.hidden = false;
    // input.hidden = false;
    // button.hidden = false;
    headWrapper.hidden = false;
}

init();

async function asyncAxios () {
    try {
        console.log(userZip);
        let request = await axios.get(weatherLink);
        console.log(request);
        weatherData = await request.data;
        setState(weatherData);
    }
    catch {
        console.error('THERE WAS SOMETHING WRONG', err);
    }
}




function setState(weatherData) {
    weatherState.city = weatherData.name;
    cityP.innerText = weatherState.city;

    weatherState.tempK = Math.round(weatherData.main.temp) + "K";
    weatherState.tempF = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32) + "\u00B0 F";
    weatherState.tempC = Math.round(weatherData.main.temp - 273.15) + '\u00B0 C';

    temperatureP1.innerText = weatherState.tempK;
    temperatureP2.innerText = weatherState.tempF;
    temperatureP3.innerText = weatherState.tempC;
    

    weatherState.condition = weatherData.weather[0].description;
    conditionP.innerText = weatherState.condition;

    // cityP.hidden = false;
    // temperatureP.hidden = false;
    // conditionP.hidden = false;
    card1.hidden = false;
    card2.hidden = false;
    card3.hidden = false;
}



zipcodeInput.addEventListener('change', checkSubmission);

function checkSubmission() {
    if (isNaN(zipcodeInput.value) === true || zipcodeInput.value.length < 5) {
        helperText.hidden = false;
    } else {
        //update weatherLink with input.value
        userZip = zipcodeInput.value;
        console.log(userZip);
        console.log(typeof userZip);
        console.log(weatherLink);
        weatherLink = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip},us&appid=${key}`;
        asyncAxios();
    }
}


// switch case

