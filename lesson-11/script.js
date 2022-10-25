// Створити сторінку, що буде показувати список продуктів для купівлі
// Cписок продуктів для купівлі - масив, кожен елемент якого представлений нижче кодом
// Довжина такого масиву - 15
// Сформувати список покупок у вигляді списку (<ul> з <li>)
// Кожний парний рядок повинен бути стилізований із backgroundColor, щоб чітко виділявся й було зручно читати. Колір - довільний
// productCountry - повинен бути <img /> із відповідним прапором
// Якщо товар не сертифікований - додавати стилізований знак оклику (!), щоб користувач звернув увагу
// Додати стилі до такого списку покупок. Якомога більше, без конкретних вимог
// Додати будь-який HTML-тег, в якого записати вартість всього продуктового кошика
// Додати будь-який HTML-тег, в якого записати найдорожчий із продуктів цього кошика
// Додати будь-який HTML-тег, в якого записати середню ціну по продуктах

window.onload = init

const shopingList = [
    {
        productName: 'bread',
        productData: {
            weight: 200,
            certificate: true,
            dateOfExpiry: '21/10/2022',
            sugarFree: true,
        },
        productProvider: 'FOP Skyba R.R.',
        productCountry: 'Ukraine',
        productPrice: 11.75,
    },
    {
        productName: 'milk',
        productData: {
            weight: 890,
            certificate: true,
            dateOfExpiry: '23/10/2022',
            sugarFree: true,
        },
        productProvider: 'LLC Galychyna',
        productCountry: 'Ukraine',
        productPrice: 31,
    },
    {
        productName: 'cheese',
        productData: {
            weight: 450,
            certificate: true,
            dateOfExpiry: '27/10/2022',
            sugarFree: true,
        },
        productProvider: 'LLC Galychyna',
        productCountry: 'Ukraine',
        productPrice: 45,
    },
    {
        productName: 'sour cream',
        productData: {
            weight: 350,
            certificate: true,
            dateOfExpiry: '24/10/2022',
            sugarFree: true,
        },
        productProvider: 'LLC Galychyna',
        productCountry: 'Ukraine',
        productPrice: 38,
    },
    {
        productName: 'water',
        productData: {
            weight: 5000,
            certificate: true,
            dateOfExpiry: '23/09/2023',
            sugarFree: true,
        },
        productProvider: 'LLC Alfa',
        productCountry: 'Ukraine',
        productPrice: 35,
    },
    {
        productName: 'chocolate bar',
        productData: {
            weight: 80,
            certificate: true,
            dateOfExpiry: '12/12/2022',
            sugarFree: false,
        },
        productProvider: 'LLC Korona',
        productCountry: 'Ukraine',
        productPrice: 35,
    },
    {
        productName: 'salmon',
        productData: {
            weight: 180,
            certificate: true,
            dateOfExpiry: '21/11/2022',
            sugarFree: true,
        },
        productProvider: 'LLC Konung',
        productCountry: 'Norway',
        productPrice: 189,
    },
    {
        productName: 'clue',
        productData: {
            weight: 50,
            certificate: false,
            dateOfExpiry: '20/11/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Mohnatyi K.B.',
        productCountry: 'China',
        productPrice: 15,
    },
    {
        productName: 'carrot',
        productData: {
            weight: 520,
            certificate: false,
            dateOfExpiry: '15/02/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 17.2,
    },
    {
        productName: 'potato',
        productData: {
            weight: 1250,
            certificate: false,
            dateOfExpiry: '15/02/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 14,
    },
    {
        productName: 'onion',
        productData: {
            weight: 1510,
            certificate: false,
            dateOfExpiry: '15/02/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 34.9,
    },
    {
        productName: 'pumpkin',
        productData: {
            weight: 470,
            certificate: false,
            dateOfExpiry: '11/12/2022',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 22,
    },
    {
        productName: 'beetroot',
        productData: {
            weight: 2320,
            certificate: false,
            dateOfExpiry: '15/02/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 28.7,
    },
    {
        productName: 'tomato',
        productData: {
            weight: 960,
            certificate: false,
            dateOfExpiry: '12/11/2022',
            sugarFree: true,
        },
        productProvider: 'FOP Baran V.A.',
        productCountry: 'Ukraine',
        productPrice: 17.2,
    },
    {
        productName: 'orange',
        productData: {
            weight: 1010,
            certificate: false,
            dateOfExpiry: '15/01/2023',
            sugarFree: true,
        },
        productProvider: 'FOP Martinez H.E.',
        productCountry: 'Ukraine',
        productPrice: 55,
    },
];

const flags = {
    Ukraine: './images/flags/Ukraine.svg',
    China: './images/flags/China.svg',
    Norway: './images/flags/Norway.svg',
}

function init () {
    const heading = createProductListHeading();
    document.body.appendChild(heading);

    const legend = createProductListLegend();
    document.body.appendChild(legend);

    const list = createProductList(shopingList);
    document.body.appendChild(list);

    const prices = getPrices(shopingList);
    document.body.appendChild(createPricesElement(prices))
}

function createProductListHeading () {
    const productListHeading = document.createElement('h1');

    productListHeading.innerText = 'Product list'
    productListHeading.classList.add('heading');

    return productListHeading
}

function createProductListLegend () {
    const productListLegend = document.createElement('div');

    productListLegend.classList.add('legend', 'list', 'listItem');

    productListLegend.append(createParagraph('Country', 'legendCountry'),
    createParagraph('Product', 'legendName'),
    createParagraph('Weight', 'legendAddInfo'),
    createParagraph('Expiry', 'legendAddInfo'),
    createParagraph('Provider', 'legendAddInfo'),
    createParagraph('Sugar', 'legendAddInfo'),
    createParagraph('Certificate', 'legendAddInfo'),
    createParagraph('Price', 'legendPrice'))

    return productListLegend
}

function createProductList (list) {
    const productList = document.createElement('ul');
    productList.classList.add('list');

    for (let product of list) {
        const listItem = createListItem(product);
        productList.appendChild(listItem);
    }

    return productList
}

function createListItem(product) {
    const li = document.createElement('li');
    
    li.classList.add('listItem');

    if (shopingList.indexOf(product) % 2 !== 0) {
        li.classList.add('evenItem');
    }

    const sugarText = product.productData.sugarFree ? 'No sugar.' : 'Contains sugar.';
    const certificateText = product.productData.certificate ? 'Certificated.' : 'Not certificated.';

    li.append((createProductImage(product.productCountry, 'country')),
    (createParagraph(product.productName, 'name')),
    (createParagraph(product.productData.weight, 'addInfo')),
    (createParagraph(product.productData.dateOfExpiry, 'addInfo')),
    (createParagraph(product.productProvider, 'addInfo')),
    (createParagraph(sugarText, 'addInfo')),
    (createParagraph(certificateText, 'addInfo')),
    (createParagraph(product.productPrice, 'price')))

    if (!product.productData.certificate) {
        li.insertAdjacentElement('afterbegin', createCertificateElement());
    }

    return li
}

function createPricesElement (prices) {
    const div = document.createElement('div');

    div.classList.add('prices');

    div.appendChild(createParagraph(`Max price: ${prices.maxPrice} UAH`));
    div.appendChild(createParagraph(`Average price: ${prices.averagePrice} UAH`));
    div.appendChild(createParagraph(`Total price: ${prices.totalPrice} UAH`));

    return div
}

function createProductImage(country, className) {
    const image = document.createElement('img');

    image.src = flags[country];
    if(className) {
        image.classList.add(className);
    }

    return image
}

function createParagraph (text, className) {
    const paragraph = document.createElement('p');

    paragraph.innerText = text;
    if (className) {
        paragraph.classList.add(className);
    }

    return paragraph
}

function createCertificateElement (certificate) {
    const exclamationMark = document.createElement('div');

    exclamationMark.classList.add('certificate');
    exclamationMark.innerText = '!';

    return exclamationMark
}

function getPrices (list) {
    const prices = {
        totalPrice: 0,
        maxPrice: -Infinity,
    }

    for (let product of list) {
        prices.totalPrice += product.productPrice;

        if (product.productPrice > prices.maxPrice) {
            prices.maxPrice = product.productPrice;
        }
    }

    return {
        ...prices, 
        averagePrice: (prices.totalPrice/list.length).toFixed(2)
    }
}




