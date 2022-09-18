// //Вивести в console числа, від 10 до 25 з кроком 0.5 (10 й 25 включно)
for (i = 10; i <= 25; i += 0.5) {
    console.log(i)
}
// Запитати та зберегти число введене із prompt.
// Визначати чи це число просте
const someNumberFromUser = +prompt("Enter some number here, please.")
if (someNumberFromUser === 1) {
    console.log(`${someNumberFromUser} is neither prime nor composite number.`);
} else if (someNumberFromUser === 2) {
    console.log(`${someNumberFromUser} is a prime number.`);
} else if (someNumberFromUser > 2) {
    for (let i = 2; i < someNumberFromUser; i++) {
        if (someNumberFromUser % i == 0) {
            console.log(`${someNumberFromUser} is not a prime number`);
            break;
        }
        else {
            console.log(`${someNumberFromUser} is a prime number`);
            break;
        }
    }
} else {
    console.log(`${someNumberFromUser} is not a prime number.`);
}
// /*Запитати та зберегти суму покупки введене із prompt. Обрахувати знижку та повідомити користувачу значення знижки. 
// Якщо сума покупки до 100 UAН - знижка 3%; якщо сума покупки до 200 UAH - знижка 5%; якщо сума покупки перевищує 200 UAH - знижка 7%*/
const purchasePrice = +prompt("What is your last purchase price in UAH?");
if (purchasePrice < 100) {
    console.log(`Your discount is 3%`);
} else if ( purchasePrice < 200) {
    console.log(`Your discount is 5%`);
} else {
    console.log(`Your discount is 7%`);
}
// Вивести таблицю множення чисел від 2 до 9 у зрозумілому форматі
for (i = 2; i < 10; i++) {
    for (j = 2; j < 10; j++) {
       console.log(`${i} * ${j} = ${i * j}`);
    }
}
// Умова: один долар коштує 36,76 гривень. Вивести дані з розрахунком вартості 10, 20, 30... 100 доларів. Формат (10 USD = 3 676 UAH)
const exangeRateUSDtoUAH = 36.76;
for (i = 10; i <= 100; i += 10) {
    console.log(`${i} USD = ${(exangeRateUSDtoUAH * i).toLocaleString()} UAH`)
}
/*
Запитати у користувача 15 чисел і обрахувати, скільки серед них додатніх, від’ємних і нулів. 
Також визначатити кількість парних і непарних. Вивести статистику через console у зрозумілому форматі. 
*** Достатньо однієї змінної (не 15) для введення чисел користувачем.
*/
let randomNumberIsNegative = 0;
let randomNumberIsZero = 0;
let randomNumberIsPositive = 0;
let randomNumberIsEven = 0;
let randomNumberIsOdd = 0;
for (i = 1; i <= 15; i++) {
    const randomNumberToCulculate = +prompt(`Enter random number #${i}`);
    console.log(randomNumberToCulculate);
    switch (Math.sign(randomNumberToCulculate)) {
        case -1: randomNumberIsNegative++;
        break;
        case 0: randomNumberIsZero++;
        break;
        case 1: randomNumberIsPositive++;
        break
    }
    switch (randomNumberToCulculate % 2 === 0) {
        case true: randomNumberIsEven++;
        break;
        case false: randomNumberIsOdd++;
        break;
    }   
}
console.log(`User entered ${randomNumberIsNegative} negative numbers.`);
console.log(`User entered ${randomNumberIsZero} zero numbers.`);
console.log(`User entered ${randomNumberIsPositive} positive numbers.`);
console.log(`User entered ${randomNumberIsEven} even numbers.`);
console.log(`User entered ${randomNumberIsOdd} odd numbers.`);

