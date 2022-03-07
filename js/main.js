
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
let iconURL;
let imageIcon;
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
        console.log(weatherData);
        console.log(weatherState);
        // string = JSON.stringify(weatherState);
        // console.log(typeof string);
        // window.localStorage.setItem(userZip, string);
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
    // cityP.innerText = weatherState.city;

    // temp
    weatherState.tempK = Math.round(weatherData.main.temp) + "K";
    weatherState.tempF = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32) + "\u00B0 F";
    weatherState.tempC = Math.round(weatherData.main.temp - 273.15) + '\u00B0 C';

    // temperatureP1.innerText = weatherState.tempK;
    // temperatureP2.innerText = weatherState.tempF;
    // temperatureP3.innerText = weatherState.tempC;
    
    // condition
    weatherState.condition = weatherData.weather[0].description;
    // conditionP.innerText = weatherState.condition;

    // switch (weatherState.condition) {
    //     case 'clear sky':
    //         document.body.style.backgroundColor = "CornflowerBlue";
    //         break;
    //     case 'few clouds':
    //         document.body.style.backgroundColor = "PaleTurquoise";
    //         break;
    //     case 'scattered clouds':
    //         document.body.style.backgroundColor = "CadetBlue";
    //         break;
    //     case 'broken clouds':
    //         document.body.style.backgroundColor = "LightSteelBlue";
    //         break;
    //     case 'shower rain':
    //         document.body.style.backgroundColor = "RoyalBlue"; 
    //         break;   
    //     case 'rain':
    //         document.body.style.backgroundColor = "DarkBlue";
    //         break;
    //     case 'thunderstorm':
    //         document.body.style.backgroundColor = "DarkSlateGray";
    //         break;
    //     case 'snow':
    //         document.body.style.backgroundColor = "Snow";
    //         break;
    //     case 'mist':
    //         document.body.style.backgroundColor = "Gainsboro";
    //         break;
    // }

    // image
    const imageIcon = weatherData.weather[0].icon;
    iconURL = `https://openweathermap.org/img/wn/${imageIcon}@4x.png`;
    // image.src = iconURL;
    // imageContainer.appendChild = image.src;

    // showCards();
    console.log(weatherState);
    updatePage(weatherState);
            string = JSON.stringify(weatherState);
        console.log(typeof string);
        window.localStorage.setItem(userZip, string);
}

function updatePage(weatherState) {
    helperText.hidden = true;
    cityP.innerText = weatherState.city;
    temperatureP1.innerText = weatherState.tempK;
    temperatureP2.innerText = weatherState.tempF;
    temperatureP3.innerText = weatherState.tempC;
    conditionP.innerText = weatherState.condition;
    image.src = iconURL;
    imageContainer.appendChild = image.src;
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
        case 'overcast clouds':
            document.body.style.backgroundColor = "LightSteelBlue";
            break;
        case 'shower rain':
            document.body.style.backgroundColor = "RoyalBlue"; 
            break;   
        case 'rain':
        case 'light rain':
            document.body.style.backgroundColor = "DarkBlue";
            break;
        case 'thunderstorm':
        case 'heavy intensity rain':
            document.body.style.backgroundColor = "DarkSlateGray";
            break;
        case 'snow':
            document.body.style.backgroundColor = "Snow";
            break;
        case 'mist':
        case 'smoke':
            document.body.style.backgroundColor = "Gainsboro";
            break;
    }
            showCards();
            image.hidden = false;
}


zipcodeInput.addEventListener('input', checkSubmission);

function checkSubmission() {
    userZip = zipcodeInput.value;
    if (isNaN(zipcodeInput.value) === true || zipcodeInput.value.length < 5) {
        helperText.hidden = false;
        zipcodeInput.style.border = "thick solid yellow";
        hideCards();
        image.hidden = true;
    } else if (window.localStorage.getItem(userZip) != null) {
           let retrieved = window.localStorage.getItem(userZip);
           console.log(retrieved);
            let jsonObject = JSON.parse(retrieved);
            console.log(jsonObject);
            console.log(typeof jsonObject);
            weatherState = jsonObject;
            console.log(weatherState);
            console.log(typeof weatherState);
            // how to display this saved state to weatherContainer ????
            updatePage(weatherState);

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



