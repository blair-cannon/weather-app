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
const temperatureP = document.querySelector('#temperatureP');
const conditionP = document.querySelector('#conditionP');


const key = '94017407c1b8e8bc75ac701e2dbb7042';
let userZip;
let weatherLink;
let weatherData = [];
let weatherState = {
    city: [],
    temperature: [],
    condition: []
}


function init () {
    cityP.hidden = true;
    temperatureP.hidden = true;
    conditionP.hidden = true;
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
    // const cityText = document.createTextNode(weatherState.city);
    // cityP.appendChild(cityText);
    // weatherContainer.appendChild(cityP);

    weatherState.temperature = weatherData.main.temp + "K";
    temperatureP.innerText = weatherState.temperature;
    // const weatherText = document.createTextNode(weatherState.temperature);
    // temperatureP.appendChild(weatherText);
    // weatherContainer.appendChild(temperatureP);

    weatherState.condition = weatherData.weather[0].description;
    conditionP.innerText = weatherState.condition;
    // const conditionText = document.createTextNode(weatherState.condition);
    // conditionP.appendChild(conditionText);
    // weatherContainer.appendChild(conditionP);

    cityP.hidden = false;
    temperatureP.hidden = false;
    conditionP.hidden = false;
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

