const helperText = document.querySelector('p');
const weatherBlock = document.querySelector('#weatherContainer'); // id in html
const input = document.querySelector('#zipcodeBox');
const header = document.querySelector('#header');
const button = document.querySelector('#button');
const headWrapper = document.querySelector('#headWrapper');
const cityP = document.createElement('p');
const temperatureP = document.createElement('p');
const conditionP = document.createElement('p');


const key = '94017407c1b8e8bc75ac701e2dbb7042';
let userZip;
let weatherLink = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip},us&appid=${key}`;
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
    let request = await axios.get(weatherLink);
    console.log(request);
    weatherData = await request.data;
    setState(weatherData);
}




function setState(weatherData) {
    weatherState.city = weatherData.name;
    const cityText = document.createTextNode(weatherState.city);
    cityP.appendChild(cityText);
    weatherBlock.appendChild(cityP);

    weatherState.temperature = weatherData.main.temp + "K";
    const weatherText = document.createTextNode(weatherState.temperature);
    temperatureP.appendChild(weatherText);
    weatherBlock.appendChild(temperatureP);

    weatherState.condition = weatherData.weather[0].description;
    const conditionText = document.createTextNode(weatherState.condition);
    conditionP.appendChild(conditionText);
    weatherBlock.appendChild(conditionP);

    console.log(weatherState);
}



input.addEventListener('change', checkSubmission);

function checkSubmission() {
    if (isNaN(input.value) === true || input.value.length < 5) {
        helperText.hidden = false;
    } else {
        //update weatherLink with input.value
        userZip = input.value;
        asyncAxios();
    }
}



cityP.style.border = "solid black";
// do more css and bootstrap