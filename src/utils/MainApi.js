class MainApi {
    constructor() {
        this._url = 'https://api.kirbro.nomoredomainsmonster.ru';
    }

    _checkRes(res) { return res.ok ? res.json() : Promise.reject(res.status) }

    _req(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkRes)
    }
    
    getUserData(token) {
        return this._req('/users/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    registr(username, email, password) {
        return this._req('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        })
    }

    auth(email, password) {
        return this._req('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    }

    setUserInfo(username, email, token) {
        return this._req('/users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username,
                email: email
            })
        })
    }

    getMovies(token) {
        return this._req('/movies', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    addMovie(data, token) {
        return this._req('/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                description: data.description,
                year: data.year,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            })
        })
    }

    removeMovie(cardId, token) {
        return this._req(`/movies/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

const mainApi = new MainApi();

export default mainApi