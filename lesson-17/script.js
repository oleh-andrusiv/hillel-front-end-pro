// 1. За основу взяти ДЗ 15. AJAX
// 2. Докинути стилів та гарно оформити. Це важливо
// 3. Переписати ввесь робочий код під async/await
// 4. Забрати обмеження в кількість міст. Відтепер можна вводити будь-яке місто/селище тощо, й якщо API повертає результат - відмальовувати його.
// 5. В іншому випадку - повідомлення, що такого міста не знайдено
// 6. Додати новий функціонал використавши https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/neighbors/%7BlocationKey%7D
// 7. Після отримання погоди по конкретному місцю на кроці 3, під погодою на 5 днів повине відобразитись список міст, які видасть API на кроці 5.
// 8. Кожне таке нове місто - це є кнопка/плитка/контейнер. При кліку на такий контейнер необхідно отримати погоду по клікнотому місту
// 9. Й так нескінченно, кожне місто матиме "сусідів"
const weatherIcons = {
    dayIcons: {
        "Sunny": "./img/day_sunny",
        "Mostly sunny": "./img/day_mostly-sunny",
        "Partly sunny": "./img/day_partly-sunny",
        "Intermittent clouds": "./img/day_intermittent-clouds",
        "Hazy sunshine": "./img/day_hazy-sunshine",
        "Mostly cloudy": "./img/day_mostly-cloudy",
        "Cloudy": "./img/day-night_cloudy",
        "Dreary": "./img/day-night_dreary-overcast",
        "Fog": "./img/day-night_fog",
        "Showers": "./img/day-night_showers",
        "Mostly cloudy w/ showers": "./img/day_mostly-cloudy-w-showers",
        "Partly sunny w/ showers": "./img/day_partly-sunny-w-showers",
        "Thunderstorms": "./img/day-night_t-storms",
        "Mostly cloudy w/ thunderstorms": "./img/day_mostly-cloudy-w-t-storms",
        "Partly sunny w/ thunderstorms": "./img/day_partly-sunny-w-t-storms",
        "Rain": "./img/day-night_rain",
        "Flurries": "./img/day-night_flurries",
        "Mostly cloudy w/ flurries": "./img/day_mostly-cloudy-w-flurries",
        "Partly sunny w/ flurries": "./img/day_partly-sunny-w-flurries",
        "Snow": "./img/day-night_snow",
        "Mostly cloudy w/ snow": "./img/day_mostly-cloudy-w-snow",
        "Ice": "./img/day-night_ice",
        "Sleet": "./img/day-night_sleet",
        "Freezing rain": "./img/day-night_freezing-rain",
        "Rain and snow": "./img/day-night_rain-and-snow",
        "Hot": "./img/day-night_hot",
        "Cold": "./img/day-night_cold",
        "Windy": "./img/day-night_windy",
    },
    nightIcons: {
        "Cloudy": "./img/day-night_cloudy",
        "Dreary": "./img/day-night_dreary-overcast",
        "Fog": "./img/day-night_fog",
        "Showers": "./img/day-night_showers",
        "Clear": "./img/night_clear",
        "Mostly clear": "./img/night_mostly-clear",
        "Partly cloudy": "./img/night_partly-cloudy",
        "Intermittent clouds": "./img/night_intermittent-clouds",
        "Hazy moonlight": "./img/night_hazy-moonlight",
        "Mostly cloudy": "./img/night_mostly-cloudy",
        "Partly cloudy w/ chowers": "./img/night_partly-cloudy-w-showers",
        "Mostly cloudy w/ showers": "./img/night_mostly-cloudy-w-showers",
        "Partly cloudy w/ thunderstorms": "./img/night_partly-cloudy-w-t-storms",
        "Mostly cloudy w/ thunderstorms": "./img/night_mostlycloudy-w-t-storms",
        "Mostly cloudy w/ flurries": "./img/night_mostly-cloudy-w-flurries",
        "Mostly cloudy w/ snow": "./img/night_mostly-cloudy-w-snow",
        "Ice": "./img/day-night_ice",
        "Sleet": "./img/day-night_sleet",
        "Freezing rain": "./img/day-night_freezing-rain",
        "Rain and snow": "./img/day-night_rain-and-snow",
        "Hot": "./img/day-night_hot",
        "Cold": "./img/day-night_cold",
        "Windy": "./img/day-night_windy",
        "Snow": "./img/day-night_snow",
        "Rain": "./img/day-night_rain",
        "Flurries": "./img/day-night_flurries",
        "Thunderstorms": "./img/day-night_t-storms",
    },
};

const accuAPIKey = '?apikey=MJERZAtUC5FUqaraCyRUs76U5J43ca4q';
// MJERZAtUC5FUqaraCyRUs76U5J43ca4q
// tcDEBsG413YYXqNFItcH0g3TZpARj2I6
const accuForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
const accuCitySearchURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const accuNeighborsURL = 'http://dataservice.accuweather.com/locations/v1/cities/neighbors/'; 

const getTempInCelsium = (fahrenheit) => (((fahrenheit - 32) * 5) / 9).toFixed(0);

const clearWeather = () => (document.querySelector('.main').innerHTML = '');

const clearSearch = () => (document.querySelector('.header_city-selector').value = '');

const displayError = (text) => {
    const displayError = document.createElement('p');
    displayError.classList.add('forecast_error');
    displayError.innerText = text;

    document.querySelector('.main').append(displayError);
};

async function searchCity (city) {
    try {
        const response = await fetch (`${accuCitySearchURL}${accuAPIKey}&q=${city}`);
        const result = await response.json();
        
        if (response.status === 200 && result.length == 0) {
            displayError("This city doesn't exist. Please, try again.");
        } else if (response.status === 200 && result.length >= 1) {
            loadWeather(result[0].Key);
            setTimeout(() => {
                loadNeighborCities (result[0].Key);    
            }, 3000);
        } else {
            displayError('Something goes wrong. Please, try again later.');
        }
        
    } catch (error) {
        displayError('Something goes wrong. Please, try again later.');
    }  
};

async function loadWeather (locationKEY) {
    try {
        const response = await fetch (`${accuForecastURL}${locationKEY}${accuAPIKey}`);
        const result = await response.json();
        
        if (response.status === 200) {
            for (element of result.DailyForecasts) {
                const date = new Date(element.Date);
                const minTemp = element.Temperature.Minimum.Value;
                const maxTemp = element.Temperature.Maximum.Value;
                const dayClouds = element.Day.IconPhrase;
                const nightClouds = element.Night.IconPhrase;
                const day = result.DailyForecasts.indexOf(element) + 1;
                
                displayWeather(date, minTemp, maxTemp, dayClouds, nightClouds, day);
            };
        } else {
            displayError('Something goes wrong. Please, try again later.');    
        }
        
    } catch (error) {
        displayError('Something goes wrong. Please, try again later.');
    }  
};

async function loadNeighborCities (locationKEY) {
    try {
        const response = await fetch (`${accuNeighborsURL}${locationKEY}${accuAPIKey}`);
        const result = await response.json();

        if (response.status === 200) {
            displayNeighborsList();

            for (element of result) {
                const cityName = element.EnglishName;
                const locationKEY = element.Key;

                displayNeighborCity (cityName, locationKEY)
            };
        } else {
            displayError('Something goes wrong. Please, try again later.');
        }

    } catch (error) {
        displayError('Something goes wrong. Please, try again later.');
    }  
};

function displayWeather (date, minTemp, maxTemp, dayClouds, nightClouds, day) {
    const dayForecast = document.createElement('div');
    dayForecast.classList.add('daily_forecast', `day${day}`);
    document.querySelector('.main').append(dayForecast);
    
    const dayDate = document.createElement('p');
    dayDate.classList.add('daily_forecast_date');
    dayDate.innerText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    dayForecast.append(dayDate);
    
    const dayPart = document.createElement('div');
    dayPart.classList.add('daily_forecast_day');
    dayForecast.append(dayPart);
    
    const maxTemperature = document.createElement('p');
    maxTemperature.classList.add('daily_forecast_temp-max');
    maxTemperature.innerText = `MAX temperature: ${getTempInCelsium(maxTemp)}°C`;
    dayPart.append(maxTemperature);
    
    const dayPartClouds = document.createElement('p');
    dayPartClouds.classList.add('daily_forecast_clouds-day');
    dayPartClouds.innerText = `${dayClouds} is expected.`;
    dayPart.append(dayPartClouds);

    const dayPartIcon = document.createElement('img');
    dayPartIcon.setAttribute('class', 'daily_forecast_day_icon');
    dayPartIcon.setAttribute('src', weatherIcons.dayIcons[dayClouds]);
    dayPartIcon.setAttribute('alt', dayClouds);
    dayPartIcon.innerText = `${dayClouds} is expected.`;
    dayPart.append(dayPartIcon);

    const nightPart = document.createElement('div');
    nightPart.classList.add('daily_forecast_night');
    dayForecast.append(nightPart);
    
    const minTemperature = document.createElement('p');
    minTemperature.classList.add('daily_forecast_temp-min');
    minTemperature.innerText = `MIN temperature: ${getTempInCelsium(minTemp)}°C`;
    nightPart.append(minTemperature);
    
    const nightPartClouds = document.createElement('p');
    nightPartClouds.classList.add('daily_forecast_clouds-night');
    nightPartClouds.innerText = `${nightClouds} is expected.`;
    nightPart.append(nightPartClouds);

    const nightPartIcon = document.createElement('img');
    nightPartIcon.setAttribute('class', 'daily_forecast_night_icon');
    nightPartIcon.setAttribute('src', weatherIcons.nightIcons[nightClouds]);
    nightPartIcon.setAttribute('alt', nightClouds);
    nightPartIcon.innerText = `${nightClouds} is expected.`;
    nightPart.append(nightPartIcon);
};

function displayNeighborsList () {
    const neighborsList = document.createElement('div');
    neighborsList.classList.add('neighbors-container');
    document.querySelector('.main').append(neighborsList);
};

function displayNeighborCity (cityName, locationKEY) {
    const neighborCity = document.createElement('button');
    neighborCity.innerText = cityName;
    neighborCity.classList.add('neighbors-container_neighbor-city');
    neighborCity.setAttribute('id', locationKEY);

    document.querySelector('.neighbors-container').append(neighborCity);
};

document.querySelector('.header_city-select_btn').addEventListener('click', () => {
    const selectedCity = document.querySelector('.header_city-selector');
    const choosedCity = document.querySelector('.header_city');
    choosedCity.innerText = selectedCity.value;

    clearWeather();
    searchCity(selectedCity.value);
    clearSearch();
});

document.addEventListener('click', (event) => {
    const element = event.target;
    const choosedCity = document.querySelector('.header_city');

    if (element.classList.contains('neighbors-container_neighbor-city')) {

        const neighborLocationKEY = element.getAttribute('id');
        
        clearWeather();
        loadWeather(neighborLocationKEY);
        setTimeout(() => {
            loadNeighborCities (neighborLocationKEY);    
        }, 3000);

        choosedCity.innerText = element.innerText;
    }
});