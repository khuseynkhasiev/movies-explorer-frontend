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
const patchUser = (email, name) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, name})
    }).then((res) => getResponse(res))
}
const getProfileInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => getResponse(res))
}
const getSavedCards = () => {
    return fetch(`${BASE_URL}/movies`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => getResponse(res))
}
const postSavedCard = ({
                       country,
                       director,
                       duration,
                       year,
                       description,
                       image,
                       nameRU,
                       nameEN,
                       trailerLink,
                       id,
}) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image: `https://api.nomoreparties.co${image.url}`,
            nameRU,
            nameEN,
            thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
            trailerLink,
            id,
        })
    }).then((res) => getResponse(res));
}

export { postSavedCard, register, authorize, getProfileInfo, patchUser, getSavedCards }