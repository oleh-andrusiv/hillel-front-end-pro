// Реалізувати веб-сторінку для пошуку фільмів.
// На головній сторінці необхідно реалізувати форму для введення назви фільму/серіалу
// Реалізувати кнопку Search та при кліку на яку необхідно відправити відповідний запит до API ресурсу OMDB (http://www.omdbapi.com/) за допомогою AJAX (fetch).
// Результат необхідно розпарсити та відобразити нижче на сторінці. Якщо за заданими пошуком полес не знайдено фільмів, то з’являється повідомлення Movie not found
// OMDB за замовчуванням повертає лише перші 10 фільмів. Тому необхідно реалізувати пагінацію
// Біля кожного фільму повинна бути кнопка Details, натискання на яку виводитиме детальну інформацію про фільм. Цю інформацію необхідно виводити на цій же сторінці одразу під списком знайдених фільмів і пагінацією.
// Всі запити необхідно відправляти за допомогою AJAX. Тобто при натисканні на будь-які кнопки веб-сторінка не повинна оновлюватися.
// Посилання на API OMDB: http://www.omdbapi.com/ (необхідно зареєструватися для отримання API KEY).

const requestURL = 'http://www.omdbapi.com/?apikey='
const myAPIKey = '4b57bc52';
let pageCount = 1;


const clearList = () => {
    const main = document.querySelector('.main');
    main.innerHTML = '';
};

const clearSearch = () => {
    const searchInput = document.querySelector('.header_movie-search_input');
    searchInput.value = '';
};

const clearDetails = () => {
    const detailsBlock = document.querySelector('.detailsBlock');
    detailsBlock.remove();

};

const displayPages = (quantity) => {
    const main = document.querySelector('.main');

    const displayPages = document.createElement('div');
    displayPages.classList.add('pages');
    
    if (quantity > 10) {
        for (let i = 1; i <= 10; i++) {
            const page = document.createElement('button');

            page.innerText = i;
            page.classList.add('page');
            page.setAttribute('id', i)

            displayPages.append(page);
        }
    }

    if (quantity < 10) {
        let pageCount = 1;
        do {
            const page = document.createElement('button');

            page.innerText = pageCount++;
            page.classList.add('page');
            page.setAttribute('id', pageCount)

            displayPages.append(page);
        } while (pageCount <= quantity);
    }

    main.append(displayPages);
};

const countPages = (quantity) => {
    const pagesQuantity = Math.ceil(quantity/10);
    displayPages(pagesQuantity)
};

const createPoster = (imgURL, className) => {
    const image = document.createElement('img');

    image.src = imgURL;
    if(className) {
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

const createDetailsBTN = (id, className) => {
    const detailsBTN = document.createElement('button');

    detailsBTN.innerText = 'details';
    detailsBTN.setAttribute('id', id) 
    if (className) {
        detailsBTN.classList.add(className);
    }

    return detailsBTN
}

const createListItem = (movie) => {
    const li = document.createElement('li');
    
    li.classList.add('listItem');

    li.append((createPoster(movie.Poster, 'poster')),
    (createParagraph(movie.Title, 'title')),
    (createParagraph(movie.Year, 'year')),
    (createParagraph(movie.Type, 'type')),
    (createDetailsBTN(movie.imdbID, 'imdbID')))

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

const displayMovies = (moviesList) => {
    const list = createMoviesList(moviesList);
    const main = document.querySelector('.main');
    main.appendChild(list);
};

function displayDetails (actors, boxOffice, genre, released, runtime) {
    const main = document.querySelector('.main');

    const detailsBlock = document.createElement('div');
    detailsBlock.classList.add('detailsBlock');

    detailsBlock.append((createParagraph(`Actors: ${actors}`, 'actors')),
    (createParagraph(`Box office: ${boxOffice}`, 'boxOffice')),
    (createParagraph(`Genre: ${genre}`, 'genre')),
    (createParagraph(`Released: ${released}`, 'released')),
    (createParagraph(`Runtime: ${runtime}`, 'runtime')))

    main.appendChild(detailsBlock)
};

const displayError = () => {
    const main = document.querySelector('.main');

    const displayError = document.createElement('p');
    displayError.classList.add('movies-list_error');
    displayError.innerText = 'Something goes wrong. Please, try again later.';
    main.append(displayError);
};

const loadMovies = (movieKeyWord) => {

    fetch(`${requestURL}${myAPIKey}&s=${movieKeyWord}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
        displayMovies(result.Search);
        countPages(result.totalResults);
    })
    .catch(() => {
        displayError()
    });
};

const loadMoviesByPage = (movieKeyWord, pageNumber) => {

    fetch(`${requestURL}${myAPIKey}&s=${movieKeyWord}&page=${pageNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
        displayMovies(result.Search);
        countPages(result.totalResults);
    })
    .catch(() => {
        displayError()
    });
};

function loadDetailes (movieID) {

    fetch(`${requestURL}${myAPIKey}&i=${movieID}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayDetails(data.Actors, data.BoxOffice, data.Genre, data.Released, data.Runtime);
    })
    .catch(() => {
        displayError()
    });
};

document.querySelector('.header_movie-search_btn').addEventListener('click', () => {
    const enteredKeyWord = document.querySelector('.header_movie-search_input');
    const searchedKeyWord = document.querySelector('.header_movie-keyword');
    searchedKeyWord.innerText = `search: "${enteredKeyWord.value}"`;
    const movieKeyWord = enteredKeyWord.value;

    clearList();
    // clearSearch();
    loadMovies(movieKeyWord);
});

document.addEventListener('click', (event) => {
    const element = event.target
    const movieID = element.getAttribute('id')
    if (element.classList.contains('imdbID') && document.querySelector('.detailsBlock')) {
       
        clearDetails();
    }
    if (element.classList.contains('imdbID')) {
    
        loadDetailes(movieID);
    }
});

document.addEventListener('click', (event) => {
    const element = event.target
    const pageNumber = element.getAttribute('id')
    // if (element.classList.contains('page') && document.querySelector('.detailsBlock')) {
       
    //     clearDetails();
    // }
    if (element.classList.contains('page')) {
        const enteredKeyWord = document.querySelector('.header_movie-search_input');
        const movieKeyWord = enteredKeyWord.value;
        
        clearList();
        loadMoviesByPage(movieKeyWord, pageNumber);
    }
});