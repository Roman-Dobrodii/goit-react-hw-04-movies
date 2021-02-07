import axios from "axios";

const baseURL = `https://api.themoviedb.org/3`;
const API_KEY = `63d22825f7a9f57519fb348a0e41a864`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTrending() {
    return axios
      .get(`${baseURL}/trending/all/week?api_key=${API_KEY}`)
      .then(({ data }) => {
        return data.results;
      });
  },

  searchMovie(query, page = 1) {
    return axios.get(
      `${baseURL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
  },

  getMovieInfo(movie_id) {
    return axios.get(
      `${baseURL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    );
  },

  getMovieCast(movie_id) {
    return axios.get(`${baseURL}/movie/${movie_id}/credits?api_key=${API_KEY}`);
  },

  getReviews(movie_id) {
    return axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
  },
};
