const isNumber = (number) => {
    return typeof (number) === 'number' && !isNaN(number)
}
const isString = (string) => {
    return typeof (string) === 'string' && !!string
}
const isBoolean = (boolean) => {
    return typeof (boolean) === 'boolean'
}
/* 
1. Cтворити функцію, яка створює та реєструє нову команду у автопробізі. 
Під час виклику функції потрібно передати дані про команду - назва команди, ім'я водія, 
рік народження водія, марка автомобіля, спонсор команди та чи водій допущений до автопробігу
*/
const createNewTeam = (team_name, driver_name, driver_birth_year, car_mark, team_sponsor, driver_admission) => {
    if (isString(team_name) || !isString(driver_name) || !isNumber(driver_birth_year) || !isString(car_mark) || !isString(team_sponsor) || !isBoolean(driver_admission)) {
        return 'Some arguments has an incorrect type.'
    } else if (driver_birth_year >= 2004 && driver_birth_year <= 1962) {
        return 'It seems that driver year of birth is not real or allowed.'
    }
    return {
        team_name,
        driver_name,
        driver_birth_year,
        car_mark,
        team_sponsor,
        driver_admission,
    }
}
const team_1 = createNewTeam ('1', 'ros', 1994, 'true', 'ford', true);
/* 
2. Запитати дані (через prompt та циклічно) про нового користувача у системі та зберегти його в об'єкт. 
Дані про користувача - логін, пароль, місто, країна, стать, вік
*/
let newUserTemplate = {
    login: "empty",
    password: "empty",
    city: "empty",
    country: "empty",
    gender: "empty",
    age: "empty",
}
const createUser = () => {
    let newUser = {}
    for (let key in newUserTemplate) {
        let collectUserData = prompt(`Enter your ${key}, please.`);
        if (key === 'login' && (!isString(collectUserData) || isNumber(Number(collectUserData)))
            || key === 'password' && (!isString(collectUserData) || isNumber(Number(collectUserData)))
            || key === 'city' && (!isString(collectUserData) || isNumber(Number(collectUserData)))
            || key === 'country' && (!isString(collectUserData) || isNumber(Number(collectUserData)))
            || key === 'gender' && (!isString(collectUserData) || isNumber(Number(collectUserData)))
            || key === 'age' && !isNumber(Number(collectUserData))) {
            return console.log('Some arguments has an incorrect type.');
        } else if (key === 'age') {
            newUser[key] = Number(collectUserData);    
        } else {
            newUser[key] = collectUserData;
        }
    }
    return newUser
}
const newUser_1 = createUser()
/* 3. Створити функцію, яка буде міняти дані в конкретного користувача створеного пунктом вище. 
Наприклад сhangeUserData(user_1, city, 'Kherson). 
Де user_1 - обʼєкт в якому буде мінятись, city - поле, яке буде мінятися на нове значення - 'Kherson'
*/
let askNewCity = prompt("Enter your new city.")
const changeUserData = (user_num, key, value) => {
    if (key in user_num) {
        if (key === 'login' && (!isString(value) || isNumber(Number(value)))
            || key === 'password' && (!isString(value) || isNumber(Number(value)))
            || key === 'city' && (!isString(value) || isNumber(Number(value)))
            || key === 'country' && (!isString(value) || isNumber(Number(value)))
            || key === 'gender' && (!isString(value) || isNumber(Number(value)))
            || key === 'age' && !isNumber(Number(value))) {
                return console.log(`Your arguments ${key} has an incorrect type. So, object will not be changed.`);
            } else {
                return user_num[key] = value;
            }

    } else {
        console.log(`${key} property doesn't exist in ${user_num}`)
    }
}
changeUserData(newUser_1, "city", askNewCity)
/* 4. Створити об'єкт cтудента - name, surname, age, course, city, greeting, addHomework. 
greeting - метод, котрий виводить повідомлення через console.log('Hi. everyone!'). 
addHomework - метод, котрий виводить повідомлення через console.log('Sending my howework... Please, wait')
*/
const student_1 = {
    name: 'Oleh',
    surname: 'Andr',
    age: 23,
    course: 2,
    city: 'Kyiv',
    greeting: console.log('Hi. everyone!'),
    addHomework: console.log('Sending my howework... Please, wait'),
}
// 5. Cтворити функцію isEmpty, яка повертає true, якщо об’єкт не має властивостей (порожній), інакше false.
const isEmpty = (anyObj) => {
        for (let key in anyObj) {
            return false;
        }
        return true;
      }
isEmpty(student_1)    
// 6. Створити об’єкт для зберігання виручки команди продавців, наприклад: {Taras: 2000, Marta: 10 Ivan: 1200, Petro: 400, Roma: 366, Alina: 829}
const salesTeamIncome = {
    Taras: 2000, 
    Marta: 10, 
    Ivan: 1200,
    Petro: 400,
    Roma: 366, 
    Alina: 829,
}
// 7. Створити функцію, яка працює з цим обʼєктом та обчислює суму всіх виручок та виводить результат через сonsole.log
const calculateSalesTeamIncome = () => {
    let salesAmountSum = 0;
    for (let key in salesTeamIncome) {
        salesAmountSum += salesTeamIncome[key];
    }
    return console.log(`Total team income equal ${salesAmountSum}`);
}
calculateSalesTeamIncome()
// 8. Створити фукнцію, яка працює з цим обʼєктом та яка знаходить продавця з найменшою виручкою та виводить результат через сonsole.log у зрозумілому форматі
const smallestIncomeTeamMember = () => {
    const values = Object.values(salesTeamIncome);
    const minValue = Math.min(...values);
    for (let key in salesTeamIncome) {
        if (!isNumber(salesTeamIncome[key])) {
            console.log('Some values has an incorrect type.');
        } else if (salesTeamIncome[key] === minValue) {
            return console.log(`The ${key} have a least income among team`);
        }
    }
}
smallestIncomeTeamMember()
// 9. Створити фукнцію, яка знаходить продавця з найбільшою виручкою та виводить результат через сonsole.log у зрозумілому форматі
const biggestIncomeTeamMember = () => {
    const values = Object.values(salesTeamIncome);
    const maxValue = Math.max(...values);
    for (let key in salesTeamIncome) {
        if (!isNumber(salesTeamIncome[key])) {
            console.log('Some values has an incorrect type.');
        } else if (salesTeamIncome[key] === maxValue) {
            return console.log(`The ${key} have a biggest income among team`);
        }
    }
}
biggestIncomeTeamMember()
// 10. Створити фукнцію, яка випадковим чином вибирає продавця місяця та виводить привітання цьому працівнику через сonsole.log у зрозумілому форматі
const chooseRandomBestWorker = () => {
    const values = Object.keys(salesTeamIncome);
    let randomBestWorker = Math.floor(Math.random() * (values.length - 1) + 1);
    return console.log(`${values.at(randomBestWorker)} is the best employee of the month. Congratulations!`);
}
chooseRandomBestWorker()
