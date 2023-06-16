const getMovies = (name) => {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((data) => {
            return data.json();
        })
        .catch((data) =>{
            return Promise.reject(`Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
        })
}
export {
    getMovies
}