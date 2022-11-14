const accuAPIKey = '?apikey=tcDEBsG413YYXqNFItcH0g3TZpARj2I6';
const accuRequestURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const citiesLocationKey = {
    lviv: 324561,
    kyiv: 324505,
    kharkiv: 323903,
    chernihiv: 322162,
    odesa: 325343,
    mariupol: 323037,
    poltava: 325523,
    zhytomyr: 326609,
    cherkasy: 321985,
    london: 328328,
    warsaw: 274663,
    newYork: 349727,
};

const xhr = new XMLHttpRequest();

const getTempInCelsium = (fahrenheit) => {
    return ((fahrenheit - 32) * 5 / 9).toFixed(0);
};

const clearWeather = () => {
    const main = document.querySelector('.main');
    main.innerHTML = '';
};

const displayWeather = (date, minTemp, maxTemp, dayClouds, nightClouds) => {
    const main = document.querySelector('.main');

    const displayDayForecast = document.createElement('div');
    displayDayForecast.classList.add('daily_forecast');
    main.append(displayDayForecast);

    const displayDate = document.createElement('p');
    displayDate.classList.add('daily_forecast_date');
    displayDate.innerText = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    displayDayForecast.append(displayDate);
    
    const displayTemp = document.createElement('div');
    displayTemp.classList.add('daily_forecast_day');
    displayDayForecast.append(displayTemp);

    const displayClouds = document.createElement('div');
    displayClouds.classList.add('daily_forecast_night');
    displayDayForecast.append(displayClouds);

    const displayMaxTemp = document.createElement('p');
    displayMaxTemp.classList.add('daily_forecast_temp-max');
    displayMaxTemp.innerText = `MAX temperature: ${getTempInCelsium(maxTemp)}°C`;
    displayTemp.append(displayMaxTemp);
    
    const displayDayClouds = document.createElement('p');
    displayDayClouds.classList.add('daily_forecast_clouds-day');
    displayDayClouds.innerText = `${dayClouds} is expected.`;
    displayTemp.append(displayDayClouds);
    
    const displayMinTemp = document.createElement('p');
    displayMinTemp.classList.add('daily_forecast_temp-min');
    displayMinTemp.innerText = `MIN temperature: ${getTempInCelsium(minTemp)}°C`;
    displayClouds.append(displayMinTemp);
    
    const displayNightClouds = document.createElement('p');
    displayNightClouds.classList.add('daily_forecast_clouds-night');
    displayNightClouds.innerText = `${nightClouds} is expected.`;
    displayClouds.append(displayNightClouds);
};

const displayError = () => {
    const main = document.querySelector('.main');

    const displayError = document.createElement('p');
    displayError.classList.add('forecast_error');
    displayError.innerText = 'Something goes wrong. Please, try again later.';
    main.append(displayError);
};

const loadWeather = (city) => {

    xhr.open('GET', `${accuRequestURL}${citiesLocationKey[city]}${accuAPIKey}`);

    xhr.send();

    xhr.onload = function () {
        const result = JSON.parse(this.response);

        if (this.readyState === 4 && this.status === 200) {
            for (element of result.DailyForecasts) {
                const date = new Date(element.Date);
                const minTemp = element.Temperature.Minimum.Value;
                const maxTemp = element.Temperature.Maximum.Value;
                const dayClouds = element.Day.IconPhrase;
                const nightClouds = element.Night.IconPhrase;

                displayWeather(date, minTemp, maxTemp, dayClouds, nightClouds);
            }
        } else {
            displayError()
        }
    };

    xhr.onerror = function () {
        displayError()
    };
};

document.querySelector('.header_city-select_btn').addEventListener('click', () => {
    const selectedCity = document.querySelector('.header_city-selector');
    const choosedCity = document.querySelector('.header_city');
    choosedCity.innerText = selectedCity.value;

    clearWeather();
    loadWeather(selectedCity.value);
});