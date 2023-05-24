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
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then((res) => getResponse(res))
        .then((user) => {
            localStorage.setItem('userId', user._id);
            return user;
        })
}
const getProfileInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => getResponse(res))
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
    }).then((res) => getResponse(res));
}

export { savedCard, register, authorize, getProfileInfo }