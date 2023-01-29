import { urlMain } from './constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  setToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkServerRes);
  };

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkServerRes);
  };

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkServerRes);
  };

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkServerRes);
  }

  updateUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkServerRes);
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then(this._checkServerRes);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then(this._checkServerRes);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkServerRes);
  }
}

const mainApi = new MainApi ({
  baseUrl: urlMain,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default mainApi;
