const isNumber = (number) => {
    return typeof number === 'number' && !isNaN(number);
} 
const isObject = (object) => {
    return typeof object === "object";
};
const isString = (string) => {
    return typeof string === 'string' && string.length > 0;
}

/* 1. Створити функцію-конструктор Людини.
Властивості, які будуть описувати екземпляр Людини -
ім'я, вік, стать, національність, країна, список країн для подорожей.
Створити універсальні функції - знайомство, прокидатися,
засинати й список країн, які Людина хоче відвідати.
Роботу цих функцій можна виводити через console.log.
Але в кожній з функцій повинно використовуватись якомога більше
характеристик конкретної Людини на якій ця функція викликається
(підказка: тут треба використатии call/apply)
*/

function introduceOneself () {
    console.log(`Nice to meet you! My name is ${this.name}. I'm ${this.age} years old. My native country is ${this.country}.`);
}

function wakeUp () {
    console.log(`Now ${this.gender} ${this.name} from ${this.country} is waking up.`);
}

function fallAsleep () {
    console.log(`Now ${this.gender} ${this.name} from ${this.country} is falling asleep.`);
}

function countriesToVisite () {
    console.log(`Everyone has a countries to visit wishlist. And here is ${this.name}'s counties wishlist: ${this.countryVisitList}.`);
}

function Human (name, age, gender, nationality, country, countryVisitList) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.nationality = nationality;
    this.country = country;
    this.countryVisitList = countryVisitList;
} 

const Aeneas = new Human ('Aeneas', '12', 'male', 'greek', 'Ukraine', ['Tunisia', 'Italy']);

introduceOneself.call(Aeneas);

/* 2. Створити власну реалізацію методу .bind
(підказка: в кінці треба помістити цю власну функцію у прототип -
    Function.prototype.myOwnBind = function () { [тут_код_кастомного_bind] }
*/

//Перше рішення
Function.prototype.myOwnBind = function(fn, context) {
  let bindArgs = [].slice.call(arguments, 2);
  
  return function() {
    let fnArgs = [].slice.call(arguments);

    return fn.apply(context, bindArgs.concat(fnArgs));
  };
};

/* 3. Cтворити функцію, котра приймає 2 параметри - об'єкти.
Функція повинна перевіряти чи ці 2 обʼєкти абсолютно ідентичні
та повертає результат у зрозумілому форматі
*/

const firstObject = {
    'name': 'Bob',
    'surName': 'Good',
    'more': {
        'city': ['Poltava', 'Kherson']
    }
}
const secondObject = {
    'name': 'Bob',
    'surName': 'Good',
    'more': {
        'city': ['Poltava', 'Kyiv']
    }
}

// To compare "simple" objects (without objects as properties)

/*
const compareSimpleObjects = (obj1, obj2) => {

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return console.log(`Compared objects are not absolutely identical.`)
    }

    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return console.log(`Compared objects are not absolutely identical.`)
        }
    }
    return console.log(`Compared objects are absolutely identical.`);
}

console.log(compareSimpleObjects(firstObject, secondObject))

*/

// To compare deep nested objects

const areObjectsAbsolutelyIdentical = (obj1, obj2) => {

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let key in obj1) {

    const isObjects = isObject(obj1[key]) && isObject(obj2[key]);

    if ((isObjects && !areObjectsAbsolutelyIdentical(obj1[key], obj2[key])) ||
        (!isObjects && obj1[key] !== obj2[key])) {
        return false;
    }
  }
    return true;
};

areObjectsAbsolutelyIdentical(firstObject, secondObject); 

/* 4. Створіть функцію-конструктор Calculator, який створює об’єкти з трьома методами:
enterData - запитує два значення за допомогою prompt і запам’ятовує їх у властивостях об’єкта.
calculateSum() повертає суму цих властивостей.
calculateNSD() повертає результат пошуку НСД
calculateNSK() повертає результат пошуку НСК
*/

function Calculator () {

    if (!new.target) {
        return new Calculator();
    }

    this.enterData = function() {
        
        this.number1 = +prompt('Enter the first number.');
        this.number2 = +prompt('Enter the second number.');
    }
    
    this.calculateSum = function() { 
         
        if (this.number1 === undefined || this.number1 === undefined) {
            this.enterData() 
        }
        return this.number1 + this.number2;
    };

    this.calculateNSD = function() {

        if (this.number1 === undefined || this.number1 === undefined) {
            this.enterData() 
        }

        if (this.number1 <= 0 || this.number2 <= 0) {
            return "Zero or a negative number cann't be an arguments."
        }

        if (!isNumber(this.number1) || !isNumber(this.number2)) {
            return "Some arguments has an incorrect type."
        }
        
        const smallerNumber = Math.min(this.number1, this.number2);
        const biggerNumber = Math.max(this.number1, this.number2);
        
        if (biggerNumber % smallerNumber === 0) {
            return smallerNumber;
        }
        
        for (let i = smallerNumber - 1; i > 0; i--) {
            if (biggerNumber % i === 0 && smallerNumber % i === 0) {
                return i
            }
        }
        return "NSD doesn't exist for numbers you have entered.";
    };

    this.calculateNSK = function() {

        if (this.number1 === undefined || this.number1 === undefined) {
            this.enterData() 
        }

        return (this.number1 * this.number2) / this.calculateNSD(this.number1 * this.number2);
        
    }
}

const firstTest = new Calculator()
firstTest.enterData()
firstTest.calculateSum()
firstTest.calculateNSD()
firstTest.calculateNSK()