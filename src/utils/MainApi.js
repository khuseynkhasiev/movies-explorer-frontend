const BASE_URL = 'http://localhost:3001';

const getResponse = (res) => {
    return res.ok? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}
const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    }).then(getResponse);
}
const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(getResponse)
        .then((data) => {
            console.log(data);
            /*localStorage.setItem('userId', '646489fcc0642533dbcb1d49');*/
            return data;
        })
}
const savedCard = (country,
                   director,
                   duration,
                   year,
                   description,
                   image,
                   nameRU,
                   nameEN,
                   thumbnail,
                   trailerLink,
                   movieId,) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            nameRU,
            nameEN,
            thumbnail,
            trailerLink,
            movieId,
        })
    }).then(getResponse);
}

export { savedCard, register, authorize }