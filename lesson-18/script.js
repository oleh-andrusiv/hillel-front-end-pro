// За основу взяти ДЗ 16. Promises. Fetch API
// Всі fetch операції переписати використавши axios бібліотеку
// Замінити всі .then() (якщо є в коді) на async/await
// Покращити стилізацію
// Покращити пагінацію, якщо це можливо та є час
// Максимально покращити код (деструктуризація, ф-ії, стрілочні ф-ії, однострічкові ф-ії з неявним return тощо)

const requestURL = 'http://www.omdbapi.com/?apikey='
const myAPIKey = '4b57bc52';
const main = document.querySelector('.main');

// import axios from 'axios'; 
// видає помилку (SyntaxError: Cannot use import statement outside a module), яку не зміг поки вирішити, тому підключив через CDN

const clearList = () => (main.innerHTML = '');
const countPages = (quantity) => (Math.ceil(quantity/10));
const clearDetails = () => (document.querySelector('.detailsBlock').remove());
// const countPagesPortions = (pagesQuantity) => (Math.ceil(pagesQuantity/10));

const createPoster = (imgURL, className) => {
    const image = document.createElement('img');
    image.src = imgURL;
    
    if (imgURL === 'N/A') {
        image.src = "./img/no-image-poster.png";
    } 

    if (className) {
        image.classList.add(className);
    }

    return image
};

const createParagraph = (text, className) => {
    const paragraph = document.createElement('p');
    
    paragraph.innerText = text;
    if (className) {
        paragraph.classList.add(className);
    }
    
    return paragraph
};

const createButton = (innerText, className, id) => {
    const btn = document.createElement('button');

    btn.innerText = innerText;

    if (className) {
        btn.classList.add(...className);
    }

    if (id) {
        btn.setAttribute('id', id);
    }

    return btn
}

const createListItem = (movie) => {
    const li = document.createElement('li');
    
    li.classList.add('listItem');
    
    li.append((createPoster(movie.Poster, 'poster')),
    (createParagraph(movie.Title, 'title')),
    (createParagraph(movie.Year, 'year')),
    (createParagraph(movie.Type, 'type')),
    (createButton('details', ['imdbID'], movie.imdbID)));
    
    return li
};

const createMoviesList = (list) => {
    const moviesList = document.createElement('ul');
    moviesList.classList.add('list');
    
    for (let element of list) {
        const listItem = createListItem(element);
        moviesList.appendChild(listItem);
    }
    
    return moviesList
};

const displayPages = (quantity, pageNumber) => {
    const pagesContainer = document.createElement('div');
    pagesContainer.classList.add('pages');

    const pagesQuantity = countPages(quantity);
    
    if (pagesQuantity > 10) {
        pagesContainer.append(createButton('Prev', ['prev-btn', 'prev-next-btn', 'inactive-btn']));

        for (let i = 1; i <= 10; i++) {

            if (i == pageNumber) {
                pagesContainer.append(createButton(i, ['page', 'active-page'], i));    
            } else {
                pagesContainer.append(createButton(i, ['page'], i));
            }
        };

        pagesContainer.appendChild(createButton('Next', ['next-btn', 'prev-next-btn']));
    }

    if (pagesQuantity < 10) {
        pagesContainer.append(createButton('Prev', ['prev-btn', 'prev-next-btn', 'inactive-btn']));

        do {

            if (pageCount == pageNumber) {
                pagesContainer.append(createButton(i, ['page', 'active-page'], i));    
            } else {
                pagesContainer.append(createButton(pageCount++, ['page'], pageCount));
            }
        } while (pageCount <= pagesQuantity);

        pagesContainer.appendChild(createButton('Next', ['next-btn', 'prev-next-btn', 'inactive-btn']));
    }

    main.append(pagesContainer);
};

// const displayPages = (quantity, pageNumber) => {
//     const pagesQuantity = countPages(quantity);

//     const pagesContainer = document.createElement('div');
//     pagesContainer.classList.add('pages');

//     pagesContainer.append(createButton('Prev', ['prev-btn', 'prev-next-btn', 'inactive-btn']));

//     const pagesSelector = document.createElement('select')
//     pagesSelector.classList.add('pages-selector');
//     pagesContainer.append(pagesSelector);

//     const pageOf = document.createElement('span')
//     pageOf.classList.add('pages-for');
//     pageOf.innerText = 'of';
//     pagesContainer.append(pageOf);

//     const pagesTotalNum = document.createElement('span')
//     pagesTotalNum.classList.add('pages-num');
//     pagesTotalNum.innerText = pagesQuantity;
//     pagesContainer.append(pagesTotalNum);

//     pagesContainer.appendChild(createButton('Next', ['next-btn', 'prev-next-btn']));

//     if (pageNumber) {
//         for (let i = pageNumber; i <= pagesQuantity; i++) {
//             const pageOption = document.createElement('option');
//             pageOption.innerText = i;
//             pageOption.setAttribute('id', id);
//             pagesSelector.append(pageOption);
//         };
//     } else {
//         for (let i = 1; i <= pagesQuantity; i++) {
//             const pageOption = document.createElement('option');
//             pageOption.innerText = i;
//             pageOption.setAttribute('id', i);
//             pagesSelector.append(pageOption);
//         };
//     }
//     main.append(pagesContainer);
// }

const displayMovies = (moviesList) => {
    const list = createMoviesList(moviesList);
    main.appendChild(list);
};

const displayDetails = (actors, boxOffice, genre, released, runtime) => {
    const detailsBlock = document.createElement('div');
    detailsBlock.classList.add('detailsBlock');
    
    detailsBlock.append((createParagraph(`Actors: ${actors}`, 'actors')),
    (createParagraph(`Box office: ${boxOffice}`, 'boxOffice')),
    (createParagraph(`Genre: ${genre}`, 'genre')),
    (createParagraph(`Released: ${released}`, 'released')),
    (createParagraph(`Runtime: ${runtime}`, 'runtime')));
    
    main.appendChild(detailsBlock)
};

const displayError = () => {
    const displayError = document.createElement('p');
    displayError.classList.add('movies-list_error');
    displayError.innerText = 'Something went wrong. Please, try again later.';
    main.append(displayError);
};

const loadMovies = async (movieKeyWord) => {
    try {
        const response = await axios(`${requestURL}${myAPIKey}&s=${movieKeyWord}`);
        console.log(response)
        console.log(response.status)

        if (response.status == 200) {
            displayMovies(response.data.Search);
            displayPages(response.data.totalResults);
        } else {
            displayError();    
        }
    } catch (error) {       
        displayError();
    }
};

const loadMoviesByPage = async (movieKeyWord, pageNumber) => {
    try {
        const response = await axios(`${requestURL}${myAPIKey}&s=${movieKeyWord}&page=${pageNumber}`);

        if (response.status == 200) {
            displayMovies(response.data.Search);
            displayPages(response.data.totalResults, pageNumber);
        } else {
            displayError();    
        }
    } catch (error) {
        displayError();
    }
};

const loadDetailes = async (movieID) => {
    try {
        const response = await axios(`${requestURL}${myAPIKey}&i=${movieID}`);

        if (response.status == 200) {
            displayDetails(response.data.Actors, response.data.BoxOffice, response.data.Genre, response.data.Released, response.data.Runtime)
        } else {
            displayError();
        }
    } catch (error) {
        displayError();
    }
};

document.querySelector('.header_movie-search_btn').addEventListener('click', () => {
    const enteredKeyWord = document.querySelector('.header_movie-search_input');

    clearList();
    loadMovies(enteredKeyWord.value);
});

main.addEventListener('click', (event) => {
    const element = event.target;
    const movieID = element.getAttribute('id');

    if (element.classList.contains('imdbID') && document.querySelector('.detailsBlock')) {
       
        clearDetails();
    }
    if (element.classList.contains('imdbID')) {
    
        loadDetailes(movieID);
    }
});

main.addEventListener('click', (event) => {
    const element = event.target;
    const pageNumber = element.getAttribute('id');
    
    if (element.classList.contains('page')) {
        const enteredKeyWord = document.querySelector('.header_movie-search_input');
        
        clearList();
        loadMoviesByPage(enteredKeyWord.value, pageNumber);
    }
});