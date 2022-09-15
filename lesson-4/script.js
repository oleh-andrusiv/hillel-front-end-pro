const correctResult = (0.1 + 0.2).toFixed(1);
console.log(correctResult);
const userLogin = prompt("Enter your login.");
console.log(userLogin);
const userPassword = prompt("Enter your password.");
console.log(userPassword);
if (userLogin == "admin" && userPassword == "12pass33210") {
    console.log("Access is allowed.");
} else if (userLogin != "admin" && userPassword != "12pass33210") {
    console.log("This user have no access to the panel.");
} else {
    console.log("Login or password are wrong.")
}
let userMoney = +prompt("How much money do you have?");
console.log(`User have ${userMoney} UAH`);
console.log("Here is our price list below:")
let Watermelon = 30;
console.log(`Watermelon: ${Watermelon} UAH`);
let Carrot = 8;
console.log(`Carrot: ${Carrot} UAH`);
let Potato = 12;
console.log(`Potato: ${Potato} UAH`);
let userChoice = prompt("What would you like to buy?")
const userChooseWatermelon = userMoney / Watermelon;
// console.log(Math.floor(userChooseWatermelon));
const userChooseWatermelonChange = userMoney % Watermelon;
// console.log(userChooseWatermelonChange);
const userChooseCarrot = userMoney / Carrot;
// console.log(Math.floor(userChooseCarrot));
const userChooseCarrotChange = userMoney % Carrot;
// console.log(userChooseCarrotChange);
const userChoosePotato = userMoney / Potato;
// console.log(Math.floor(userChoosePotato));
const userChoosePotatoChange = userMoney % Potato;
// console.log(userChoosePotatoChange);
if (userChoice == "Watermelon" && userMoney >= Watermelon) {
    console.log(`За ${userMoney} грн Ви можете придбати ${Math.floor(userChooseWatermelon)} одиниць даного продукту. У Вас залишиться ${userChooseWatermelonChange} грн`);
} else if (userChoice == "Watermelon" && userMoney < 8) {
    console.log(`На жаль, у Вас недостатньо коштів для купівлі хоча б 1 шт. будь-якого продукту.`)
} else if (userChoice == "Watermelon" && userMoney < Watermelon) {
    console.log(`У вас недостатньо коштів, для купівлі хоча б 1 шт. ${userChoice}`)
}
if (userChoice == "Carrot" && userMoney >= Carrot) {
    console.log(`За ${userMoney} грн Ви можете придбати ${Math.floor(userChooseCarrot)} одиниць даного продукту. У Вас залишиться ${userChooseCarrotChange} грн`);
} else if (userChoice == "Carrot" && userMoney < 8) {
    console.log(`На жаль, у Вас недостатньо коштів для купівлі хоча б 1 шт. будь-якого продукту.`)
}
 else if (userChoice == "Carrot" && userMoney < Carrot) {
    console.log(`У вас недостатньо коштів, для купівлі хоча б 1 шт. ${userChoice}`)
}
if (userChoice == "Potato" && userMoney >= Potato) {
    console.log(`За ${userMoney} грн Ви можете придбати ${Math.floor(userChoosePotato)} одиниць даного продукту. У Вас залишиться ${userChoosePotatoChange} грн`);
} else if (userChoice == "Potato" && userMoney < 8) {
    console.log(`На жаль, у Вас недостатньо коштів для купівлі хоча б 1 шт. будь-якого продукту.`)
}
 else if (userChoice == "Potato" && userMoney < Potato) {
    console.log(`У вас недостатньо коштів, для купівлі хоча б 1 шт. ${userChoice}`)
}
let triangleSide1 = +prompt("Enter length of the first side of triangle.")
let triangleSide2 = +prompt("Enter length of the second side of triangle.")
let triangleSide3 = +prompt("Enter length of the third side of triangle.")
if ((triangleSide2 + triangleSide3) > triangleSide1 && (triangleSide3 + triangleSide1) > triangleSide2 && (triangleSide2 + triangleSide1) > triangleSide3) {
    console.log("Triangle exist!")
} else {
    console.log("Triangle doesn't exist!")
}
/* 18 HW poin

2 && 0 && 3 || true && false // false;
false || " " || 3 && true // true;
1 && 1000 && '0' || 0 && 'Bob' // 0
-1 || 0 || 0 && "" || 1010 // -1

*/