window.onload = input;

const timeToDie = document.querySelector('.timeToDie');
const timeoutBtn = document.querySelector('.startTimeout');

const userDate = document.querySelector('.dateTimer_input');
const startCountDown = document.querySelector('.dateTimer_btn');

const smartphoneChoose = document.querySelector('.smartphone_choose');
    
const priceList = {
    iphone: {
        basicPrice: 12000,
        ram: {
            ram2: 2000,
            ram4: 4000,
            ram6: 6000,
            ram8: 8000,
        },
        memory: {
            memory64: 2000,
            memory128: 4000,
            memory256: 6000,
            memory512: 8000,
        }
    },
    samsung: {
        basicPrice: 10800,
        ram: {
            ram2: 1800,
            ram4: 3600,
            ram6: 5400,
            ram8: 7200,
        },
        memory: {
            memory64: 1800,
            memory128: 3600,
            memory256: 5400,
            memory512: 7200,
        }
    },
    oneplus: {
        basicPrice: 8400,
        ram: {
            ram2: 1400,
            ram4: 2600,
            ram6: 4200,
            ram8: 5600,
        },
        memory: {
            memory64: 1400,
            memory128: 2600,
            memory256: 4200,
            memory512: 5600,
        }
    },
    pixel: {
        basicPrice: 9600,
        ram: {
            ram2: 1600,
            ram4: 3200,
            ram6: 4800,
            ram8: 6400,
        },
        memory: {
            memory64: 1600,
            memory128: 3200,
            memory256: 4800,
            memory512: 6400,
        }
    }
};

const model = document.querySelector('select[name=model]');
const ram = document.querySelector('select[name=ram]');
const memory = document.querySelector('select[name=memory]');
    

function input () {

    timeoutBtn.addEventListener('click', dieTimer);

    startCountDown.addEventListener('click', () => {
        const countDownDate = new Date(userDate.value).getTime();
    
        setInterval(createCountdown(countDownDate), 1000);
    });

    smartphoneChoose.addEventListener('click', () => {
    
        const userConfig = {
            model: model.value,
            ram: ram.value,
            memory: memory.value,
        };
    
        displayPrice(userConfig)
    });

};

// Інпут-поле із кнопкою «Start timeout» — у інпут-полі користувач може ввести кількість відповідних секунд, які залишилися у росії та росіяни до їх зникнення

function displayCogratsText () {
    const moscaliMustDie = document.createElement('p');
    moscaliMustDie.classList.add('endOfRussia_gongratsText');
    moscaliMustDie.innerText = 'All russians pigs have successfully died. Gongrats!';
    document.querySelector('.endOfRussia').appendChild(moscaliMustDie);
    return moscaliMustDie
};

function dieTimer () {
    const correctTimeValue = timeToDie.value * 1000;
    return setTimeout(displayCogratsText, correctTimeValue)
};

/* Input-поле з типом date та кнопка Start Campaign. 
Користувач обирає дату. Після того, клікає Start Campaign. 
Задача - відобразити таймер, до дати яку обрав користувач у вигляді 'До старту кампанії залишилось РОКИ:МІСЯЦІ:ГОДИНИ:ХВИЛИНИ'
*/

function createCountdown (date) {

    const now = new Date().getTime();
    const timeleft = date - now;
        
    const years = Math.floor(timeleft / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeleft % (1000 * 60 * 60 * 24 * 30 * 12)) / (1000 * 60 * 60 * 24 * 30));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

    displayCountdown(years, months, hours, minutes, timeleft)
};

function displayCountdown (years, months, hours, minutes, timeleft) {
    document.querySelector('#text').innerHTML = 'До старту кампанії залишилось '
    document.querySelector('#years').innerHTML = years + ':' 
    document.querySelector('#months').innerHTML = months + ':' 
    document.querySelector('#hours').innerHTML = hours + ':'
    document.querySelector('#minutes').innerHTML = minutes 

    if (isNaN(years) || isNaN(months) || isNaN(hours) || isNaN(minutes)) {
        document.querySelector('#years').innerHTML = ''
        document.querySelector('#months').innerHTML = ''
        document.querySelector('#hours').innerHTML = '' 
        document.querySelector('#minutes').innerHTML = ''
        document.querySelector('#text').innerHTML = 'Оберіть дату старту кампанії.';
    }
        
    if (timeleft < 0) {
        clearInterval(createCountdown);
        document.querySelector('#years').innerHTML = ''
        document.querySelector('#months').innerHTML = ''
        document.querySelector('#hours').innerHTML = '' 
        document.querySelector('#minutes').innerHTML = ''
        document.querySelector('#text').innerHTML = 'Кампанія розпочалась!';
    }
};

/* 3 select-поля та кнопка Calculate. Поле 1 - модель телефону. 
Поле 2 - кількість оперативної пам'яті. Поле 3 - обʼєм вбудованої пам'яті. 
При натисканні на кнопку - вивести ціну обраного телефону. 
Зауважте, що кожний телефон може мати всі поля, тобто уявімо, 
що всі iPhone/Samsung/Pixel/OnePlus можуть мати 2, 4, 6 та 8 ГБ оперативнох пам'яті, та 64, 128, 256 та 512 ГБ вбудованої пам'яті. 
Але ціноутворення відрізняється. Тобто iPhone/64/512 коштуватиме дорожче за Samsung/64/512
*/

function priceCalculate (config) {
    const modelPrices = priceList[config.model];

    const smartfoneCost = modelPrices.basicPrice + modelPrices.ram[config.ram] + modelPrices.memory[config.memory]

    return smartfoneCost
};

function displayPrice (config) {
    const price = document.createElement('p');
    price.classList.add('smartphone_price');
    price.innerText = `Your phone will cost ${priceCalculate(config)}`;
    document.querySelector('.smartphone').appendChild(price);
};
