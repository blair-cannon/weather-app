
const helperText = document.querySelector('#helperText');
const weatherContainer = document.querySelector('#weatherContainer'); 
const zipcodeInput = document.querySelector('#zipcodeInput');
const header = document.querySelector('#header');
// const button = document.querySelector('#button');
const headWrapper = document.querySelector('#headWrapper');
const cityP = document.querySelector('#cityP');
const temperatureP1 = document.querySelector('#temperatureP1');
const temperatureP2 = document.querySelector('#temperatureP2');
const temperatureP3 = document.querySelector('#temperatureP3');
const conditionP = document.querySelector('#conditionP');
const card1 = document.querySelector('#card1');
const card2 = document.querySelector('#card2');
const card3 = document.querySelector('#card3');
const image = document.querySelector('#image');
const imageContainer = document.querySelector('#imageContainer');
myStorage = window.localStorage;




var myModal = new bootstrap.Modal(document.getElementById('errorModal'), {
    keyboard: false
  })


const URLkey = '94017407c1b8e8bc75ac701e2dbb7042';

let userZip;
let weatherLink;
let weatherData = [];
let weatherState = {
        city: [],
        tempK: [],
        tempF: [],
        tempC: [],
        condition: [],
        image: []

}

function hideCards () {
    card1.hidden = true;
    card2.hidden = true;
    card3.hidden = true;
}

function showCards() {
    card1.hidden = false;
    card2.hidden = false;
    card3.hidden = false;
}

function init () {
    hideCards();
    helperText.hidden = true;
    headWrapper.hidden = false;
    myModal.hide();
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
    catch (error) {
        console.error('THERE WAS SOMETHING WRONG', error);
        myModal.show();      
    }
}

function setState(weatherData) {
    helperText.hidden = true;
    // city
    weatherState.city = weatherData.name;
    cityP.innerText = weatherState.city;

    // temp
    weatherState.tempK = Math.round(weatherData.main.temp) + "K";
    weatherState.tempF = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32) + "\u00B0 F";
    weatherState.tempC = Math.round(weatherData.main.temp - 273.15) + '\u00B0 C';

    temperatureP1.innerText = weatherState.tempK;
    temperatureP2.innerText = weatherState.tempF;
    temperatureP3.innerText = weatherState.tempC;
    
    // condition
    weatherState.condition = weatherData.weather[0].description;
    conditionP.innerText = weatherState.condition;

    switch (weatherState.condition) {
        case 'clear sky':
            document.body.style.backgroundColor = "CornflowerBlue";
            break;
        case 'few clouds':
            document.body.style.backgroundColor = "PaleTurquoise";
            break;
        case 'scattered clouds':
            document.body.style.backgroundColor = "CadetBlue";
            break;
        case 'broken clouds':
            document.body.style.backgroundColor = "LightSteelBlue";
            break;
        case 'shower rain':
            document.body.style.backgroundColor = "RoyalBlue"; 
            break;   
        case 'rain':
            document.body.style.backgroundColor = "DarkBlue";
            break;
        case 'thunderstorm':
            document.body.style.backgroundColor = "DarkSlateGray";
            break;
        case 'snow':
            document.body.style.backgroundColor = "Snow";
            break;
        case 'mist':
            document.body.style.backgroundColor = "Gainsboro";
            break;
    }

    // image
    const imageIcon = weatherData.weather[0].icon;
    iconURL = `https://openweathermap.org/img/wn/${imageIcon}@4x.png`;
    // iconURL.replace('icon', imageIcon);
    image.src = iconURL
    imageContainer.appendChild = image.src;

    showCards();
    console.log(weatherState);
}



zipcodeInput.addEventListener('input', checkSubmission);

function checkSubmission() {
    userZip = zipcodeInput.value;
    if (isNaN(zipcodeInput.value) === true || zipcodeInput.value.length < 5) {
        helperText.hidden = false;
        zipcodeInput.style.border = "thick solid yellow";
        hideCards();
        image.hidden = true;
    } 
    else {
        //update weatherLink with input.value
        // console.log(userZip);
        // console.log(typeof userZip);
        // console.log(weatherLink);
        image.hidden = false;
        zipcodeInput.style.border = "thick solid black";
        weatherLink = `https://api.openweathermap.org/data/2.5/weather?zip=${userZip},us&appid=${URLkey}`;
        asyncAxios();
        }
}



