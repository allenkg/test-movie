export default class Api {

  getGenres() {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/genre/list?api_key=${token}`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getSearchMovies(query, pageNumber) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${query}&page=${pageNumber}&include_adult=false`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getMovies(pageNumber) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${token}&language=ru-RU&page=${pageNumber}`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getMovieDetails(movieId) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}&language=ru-RU`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getSimilarMovies(movieId) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${token}&language=ru-RU`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getRecommendedMovies(movieId) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${token}&language=ru-RU`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getMovieCredits(movieId) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${token}&language=ru-RU`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }

  getTrailerId(movieId) {
    return new Promise((resolve, reject) => {
      const token = '2925e2c4b8391f2fb0419a60536c9817';
      let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${token}&language=ru-RU`;
      const data =  this.makeRequest('GET', url);
      resolve(data)
    })
  }


  makeRequest(method, url) {
    let fetchParams = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return fetch(url, fetchParams)
      .then(this.validateStatusCode)
      .catch(this.onResponseInvalid)
  }

  validateStatusCode(response) {
    return new Promise((resolve, reject) => {
      const status = response.status;
      const next = status < 400 ? resolve : reject;
      response.text().then(next);
    });
  }

  onResponseInvalid(payload) {
    return new Promise((resolve, reject) => reject(this.parsePayload(payload)))
  }

  parsePayload(payload) {
    try {
      return JSON.parse(payload);
    } catch (err) {
      return payload;
    }
  }

}
