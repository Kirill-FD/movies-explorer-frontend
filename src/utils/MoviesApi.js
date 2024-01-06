class MoviesApi {
    constructor(options) {
        this._url = options.baseUrl;
    }

    _checkRes(res) { return res.ok ? res.json() : Promise.reject }

    _request(url, options) {
        return fetch(`${this._url}${url}`, options)
            .then(this._checkRes)
    }

    getMovies() {
        return this._request('/')
    }
}
/*Создаем экземпляр класса Api*/
const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi