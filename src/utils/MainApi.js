export const BASE_URL = "https://api.kirbro.nomoredomainsmonster.ru";

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return getResponseData(res);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return getResponseData(res);
    })
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
  })
  .then((res) => {
    return getResponseData(res);
  })
}

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => data);
};

export const editUserData = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
  .then((data) => data);
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    return getResponseData(res);
  })
};

export const addMovie = (data, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      description: data.description,
      year: data.year,
      image: `https://api.nomoreparties.co/${data.image.url}`,
      trailerLink: data.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  })
  .then((res) => {
    return getResponseData(res);
  })
};

export const deleteMovie = (cardId, token) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
  .then((res) => {
    return getResponseData(res);
  })
};
