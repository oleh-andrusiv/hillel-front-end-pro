const isNumber = (number) => {
    return typeof number === 'number' && !isNaN (number) 
}
const isString = (string) => {
    return typeof string === 'string' && string.length > 0  
}

// 1. Створити масив, довжину та елементи якого задає користувач (через prompt). Елементами масиву повинні бути числа

const createNewArray = () => {
    let newArray = [];
    const askNewArrayLength = +prompt("How many elements would array contain?");
    if (!isNumber(askNewArrayLength)) {
        return console.log(`You must enter a number.`);
    } 

    for (let i = 0; i <= askNewArrayLength - 1; i++) {
        let askNewArrayElements = +prompt(`Enter value of the element #${i}.`);
        if (!isNumber(askNewArrayElements)) {
            console.log(`Your array values can be only a numbers.`);
            break
        } 
        newArray[i] = askNewArrayElements
    }

    if (newArray.length > 0) {
        return newArray;
    }
}
const newArray = createNewArray()

// 2. Відсортувати масив за зростанням.

newArray.sort((a, b) => a - b);

// 3. Дано масив - список покупок. Кожен елемент масиву - це обʼєкт вигляду: {productName: 'bread', productPrice: 14.5, productQuantity: 2}. Мінімальний довжина такого масиву - 6

let purchaseList = [
    {productName: 'bread', productPrice: 14.5, productQuantity: 1},
    {productName: 'mineral water', productPrice: 11.2, productQuantity: 6},
    {productName: 'sour cream', productPrice: 24, productQuantity: 2},
    {productName: 'carrot', productPrice: 17.9, productQuantity: 3},
    {productName: 'energy bar', productPrice: 4.5, productQuantity: 7},
    {productName: 'milk', productPrice: 35, productQuantity: 3},
]

// Порахувати загальну вартість корзини та вивести суму у зрозумілому форматі

let totalPurchaseSum = 0;
purchaseList.forEach(product => totalPurchaseSum += product.productPrice * product.productQuantity)
console.log(`Total cost: ${totalPurchaseSum}`);

// Порахувати найменшу кількість продукту, який потрібно купити

let lowestQuantity = Math.min(...(purchaseList.map(product => product.productQuantity)));

// Порахувати загальну кількість продуктів

let totalQuantity = 0;
purchaseList.forEach(product => totalQuantity += product.productQuantity)

// Знайти найдорожчий продукт

let mostExpensiveProduct = Math.max(...(purchaseList.map(product => product.productPrice)));

// Створити функцію, яка повинна додавати новий продукт в існуючий масив
// Дані про новий продукт - користувач вводить із prompt

const addNewProduct = (array) => {
    let newProduct = {productName: null, productPrice: null, productQuantity: null};
    for (let key in newProduct) {
        let askNewProductData = prompt(`Enter new product ${key}`);
        if (!isString(askNewProductData)) {
            return console.log(`The value can't be empty.`);
        }

        if (key === 'productPrice' || key === 'productQuantity') {
            if (!isNumber(Number(askNewProductData)) || Number(askNewProductData) <= 0) {
                return console.log(`Product price and quantity must be a positive number`);
            }

            newProduct[key] = Number(askNewProductData);
        }

        if (key === 'productName') {
            if (isNumber(Number(askNewProductData))) {
                return console.log(`Product name must be real and understandable word.`);    
            }

            newProduct[key] = askNewProductData; 
        }
    }

    if (Object.values(newProduct).every(value => value !== null) ) {
        array.push(newProduct)
        return array
    }
}
addNewProduct(purchaseList)

// Створити функцію, яка повинна видаляти конкретний продукт із існуючий масиву продуктів
// Дані про видалення такого продукту - користувач вводить із prompt лише назву

const deleteSpecificProduct = (array) => {
    let askUnnecessaryProduct = prompt(`Enter the name of a product you want to delete.`)
    if (!isString(askUnnecessaryProduct) || isNumber(Number(askUnnecessaryProduct))) {
        return console.log(`The value is empty or not a correct data type.`);
    } 

    return array.filter((product) => product.productName !== askUnnecessaryProduct) ;
}
const arrayWithoutProduct = deleteSpecificProduct(purchaseList)

// 4. Дано масив [16, -3, 54,-4, 72,-56, 47, -12, 4, -16, 25, -37, 46, 4, -51, 27, -8, 4, -54, 76, -4, 12, 6, -35]

const numberArray = [16, -3, 54, -4, 72, -56, 47, -12, 4, -16, 25, -37, 46, 4, -51, 27, -8, 4, -54, 76, -4, 12, 6, -35];

// Знайти суму та кількість позитивних елементів.

if (numberArray.some(i => !isNumber(i))) {
    console.log(`Not a correct type of data`)
} else {
    let positiveNumbersQuantity = 0;
    let positiveNumbersSum = 0;
    for (let element of numberArray) {
        if (element > 0) {
            positiveNumbersQuantity++;
            positiveNumbersSum += element;
        }
    } 

// Знайти мінімальний елемент масиву та його порядковий номер.

Math.min(...numberArray);
numberArray.indexOf(Math.min(...numberArray));

// Знайти максимальний елемент масиву та його порядковий номер.

Math.max(...numberArray);
numberArray.indexOf(Math.max(...numberArray));

// Визначити кількість негативних елементів.

let negativeNumbersQuantity = 0;
for (let element of numberArray) {
    if (element < 0) {
        negativeNumbersQuantity++;
    }
  }

// Знайти кількість непарних позитивних елементів.

let oddPositiveNumbersQuantity = 0;
for (let element of numberArray) {
    if (element % 2 !== 0) {
        oddPositiveNumbersQuantity++;
    }
  }

// Знайти суму парних позитивних елементів.

let evenPositiveNumbersSum = 0;
for (let element of numberArray) {
    if (element % 2 === 0) {
        evenPositiveNumbersSum += element;
    }
  }

// Знайти добуток позитивних елементів.

let positiveNumbersProduct = 1;
for (let element of numberArray) {
    if (element > 0) {
        positiveNumbersProduct *= element;
    }
  }
}