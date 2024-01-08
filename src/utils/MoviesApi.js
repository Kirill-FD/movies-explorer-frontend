class MoviesApi {
    constructor() {
        this._url = 'https://api.nomoreparties.co/beatfilm-movies';
    }

    _checkRes(res) { return res.ok ? res.json() : Promise.reject }

    _req(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkRes)
    }

    getMovies() {
        return this._req('/')
    }
}

const moviesApi = new MoviesApi();

export default moviesApi