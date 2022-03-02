const key = '94017407c1b8e8bc75ac701e2dbb7042';
let userZip = '40509'; // need to change later
const weatherLink = `api.openweathermap.org/data/2.5/weather?zip=${userZip},us&appid=${key}`;


async function asyncAxios () {
    let request = await axios.get(weatherLink);
    console.log(request);
    let weatherData = request.data;
    
    // setState(data)

}

asyncAxios(); // call function