/*
Return the century of the input year. The input will always be a 4 digit string, so there is no need for validation. 
"1999" --> "20th"
"2011" --> "21st"
"2154" --> "22nd"
*/

const defineCentury = (year) => {

    const chars = year.split('', 2);
    let century = +chars.join('') + 1;
    const centuryLastNum = +chars[1] + 1;

    switch (centuryLastNum) {
        case 1: 
            century += 'st';
            break
        case 2: 
            century += 'nd';
            break
        case 3: 
            century += 'rd';
            break
        default:
            century += 'th';
    }
    return century 
};

document.querySelector('.century-definder_btn').addEventListener('click', () => {
    const year = document.querySelector('.century-definder_input');
    const centuryText = document.querySelector('.century-definder_output');
    centuryText.innerText = defineCentury(year.value);
});

/*
Write a function that takes a string and outputs a strings of 1's and 0's where vowels become 1's and non-vowels become 0's. All non-vowels including non alpha characters (spaces,commas etc.) should be included.

vowelOne( "abceios" ) // "1001110"
vowelOne( "aeiou, abc" ) // "1111100100"
*/

const vowelOne = (string) => {

    const vowels = ['a', 'o', 'u', 'e', 'i', 'A', 'O', 'U', 'E', 'I'];

    const chars = string.split('');

    let arrayOfNumbers = chars.map((item) => { 
        if (vowels.includes(item)) {
            return "1"
        }
        return "0"
    });

    return arrayOfNumbers.join('')
};

document.querySelector('.binary-string_btn').addEventListener('click', () => {
    const stringForBinary = document.querySelector('.binary-string_input');
    const binaryString = document.querySelector('.binary-string_output');
    binaryString.innerText = vowelOne(stringForBinary.value);
});

/*
Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed. 
Strings passed in will consist of only letters and spaces. Spaces will be included only when more than one word is present.

spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
spinWords( "This is a test") => returns "This is a test" 
spinWords( "This is another test" )=> returns "This is rehtona test"
*/

const spinWords = (string) => {
    
    let arrayFromString = string.split(' ');
    let arrayWithSpinWords = arrayFromString.map(item => {
        if (item.length >= 5) {
            return item.split('').reverse().join('')
        }
        return item
    })
    return arrayWithSpinWords.join(' ')
};

document.querySelector('.reversed_words_btn').addEventListener('click', () => {
    const stringForReverse = document.querySelector('.reversed_words_input');
    const reversedWordsString = document.querySelector('.reversed_words_output');
    reversedWordsString.innerText = spinWords(stringForReverse.value);
});

/*
You are given a string of space separated numbers, and have to return the highest and lowest number.

highAndLow("1 2 3 4 5");  // return "5 1"
highAndLow("1 2 -3 4 5"); // return "5 -3"
highAndLow("1 9 3 4 -5"); // return "9 -5"
*/

const highAndLow = (string) => {

    const arrayFromString = string.split(' ');

    arrayFromString.sort((a, b) => b - a);

    return `${arrayFromString[0]} ${arrayFromString[arrayFromString.length -1]}`
};

document.querySelector('.high-low-number_btn').addEventListener('click', () => {
    const numsForCalculation = document.querySelector('.high-low-number_input');
    const highLowNumber = document.querySelector('.high-low-number_output');
    highLowNumber.innerText = highAndLow(numsForCalculation.value);
});

/*
Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
*/

const createPhoneNumber = (string) => {

    const array = string.split('');

    const arrayEnd = array.splice(6);
    const array2ndpart = array.splice(3);
    
    array.unshift('(');
    array.push(')', ' ');
    arrayEnd.unshift('-')
    
    const newArray = array.concat(array2ndpart, arrayEnd);
    
    return newArray.join('')
};

document.querySelector('.phone-number_btn').addEventListener('click', () => {
    const numsForPhoneNumber = document.querySelector('.phone-number_input');
    const phoneNumber = document.querySelector('.phone-number_output');
    phoneNumber.innerText = createPhoneNumber(numsForPhoneNumber.value);
});