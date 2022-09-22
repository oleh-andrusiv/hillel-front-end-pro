
const isNumber = (number) => {
    return typeof (number) === 'number' && !isNaN(number)
}
// Написати функцію, яка приймає 4 аргументи і шукає найменше число серед них
const smallestNumber = (num_1, num_2, num_3, num_4)=> {
    if (!isNumber(num_1) || !isNumber(num_2) || !isNumber(num_3) || !isNumber(num_4)) {
        return "Some arguments has an incorrect type."
    }

    return Math.min(num_1, num_2, num_3, num_4);
}
console.log(smallestNumber(4,5,-4,8));
// Написати функцію, яка приймає 2 аргументи та шукає найбільший спільний дільник для них. Якщо такого числа немає, то повідомляти про відсутність
const commonMaxDivisioner = (num_1, num_2)=> {
    if (num_1 <= 0 || num_2 <= 0) {
        return "Zero or a negative number cann't be an arguments."
    }
    if (!isNumber(num_1) || !isNumber(num_2)) {
        return "Some arguments has an incorrect type."
    }
    const smallerNumber = Math.min(num_1, num_2);
    const biggerNumber = Math.max(num_1, num_2);
    if (biggerNumber % smallerNumber === 0) {
    return smallerNumber;
    }
    for (let i = smallerNumber - 1; i > 0; i--) {
        if (biggerNumber % i === 0 && smallerNumber % i === 0) {
            return i
        }
    }
    return "Wrong";
}
console.log(commonMaxDivisioner(7, 44))
// Написати функцію, яка приймає 1 аргумент та перевіряє чи дане число ідеальне
const perfectNumber = (num_1)=> {
    if (!isNumber(num_1)) {
        return "Argument has an incorrect type."
    } else if (num_1 <= 0) {
        return "Argument equal to zero or it is a negative number."
    }
    let sumOfDivisioners = 1;
    for (let i = 2; i < num_1; i++) {
        if (num_1 % i === 0) {
            sumOfDivisioners += i;
        }
    }
    if (sumOfDivisioners === num_1) {
        return "The number is perfect."
    } else {
        return "The number isn't perfect."
    }
}
console.log(perfectNumber(6));
// Написати функцію, яка приймає 2 аргументи та обраховує суму в цьому проміжку. Зверніть увагу, що можна передати 10 та -2, як аргументи. Суму всіх чисел в цьому проміжку також треба обчислити
const spaceNumbersSum = (num_1,num_2)=> {
    if (!isNumber(num_1) || !isNumber(num_2)) {
        return "Some arguments has an incorrect type."
    }
    const smallerNumber = Math.min(num_1, num_2);
    const biggerNumber = Math.max(num_1, num_2);
    let sumOfNumberInSpace = 0;
    for (let i = smallerNumber + 1; i < biggerNumber; i++) {
        sumOfNumberInSpace += i;
    }
    return sumOfNumberInSpace;
}
console.log(spaceNumbersSum(2,-6));
// Написати функцію, яка приймає та конвертує температуру із Цельсій у Фаренгейт
function convertCelsiusToFahrenheit(celsius) {
    if (!isNumber(celsius)) {
        return "Some arguments has an incorrect type."
    }
    return celsius * 9/5 + 32
  }
console.log(convertCelsiusToFahrenheit(32));
// Написати фунцію, яка генерує випадкове ціле число в проміжку від 0 до 40
function randomInt(min, max) {
        let randomCalcResult = Math.floor(Math.random() * (max - min)) + min;
        if (randomCalcResult === 0) {
            return (randomCalcResult + 7)
        } else {
            return randomCalcResult
        }
    }
console.log(randomInt(0,40))
