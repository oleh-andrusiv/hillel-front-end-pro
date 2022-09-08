const yourName = prompt ("What's your name?");
console.log(yourName);
const yourSurname = prompt ("What's your surnname?");
console.log(yourSurname);
const yourFavoriteNumber = +prompt ("What's your your favorite number?");
console.log(yourFavoriteNumber);
alert (`Hello, ${yourName} ${yourSurname}! Your favorite number is ${yourFavoriteNumber}.`); //Probably user must see this message with his data? so I used "alert". But it can be replaced by "console.log"
let userFirstNumber = +prompt ("Please, enter the first number.");
console.log(userFirstNumber);
let userSecondNumber = +prompt ("Please, enter the second number.");
console.log(userSecondNumber);
//Futher I used just "console.log" to see results but it can be replaced by "alert" if we must see results via pop-ups
const numbersAddition = userFirstNumber + userSecondNumber;
console.log(numbersAddition);
const numbersSubtraction = userFirstNumber - userSecondNumber;
console.log(numbersSubtraction);
const numbersDivision = userFirstNumber * userSecondNumber;
console.log(numbersDivision);
const numbersMultiplication = userFirstNumber / userSecondNumber;
console.log(numbersMultiplication);
const yearOfBirth = prompt ("What year were you born in?");
let userAge =/*Current year*/ 2022 - yearOfBirth;
console.log(userAge);
//Probably you mean to calculate and display ("Знайти та обчислити...") in 10 point?
let someNumber1 = 674;
let someNumber2 = 44;
const someNumberDivisionRemainder = someNumber1 % someNumber2;
// alert (`The remainder of the division of the number ${someNumber1} by the number ${someNumber2} is equal to ${someNumberDivisionRemainder}`);
console.log(`The remainder of the division of the number ${someNumber1} by the number ${someNumber2} is equal to ${someNumberDivisionRemainder}`);
const thisNumberAreOdd = yourFavoriteNumber % 2;
const thisNumberAreOddResult = Boolean(thisNumberAreOdd);
console.log(`User's favorite number is an odd? - ${thisNumberAreOddResult}`);