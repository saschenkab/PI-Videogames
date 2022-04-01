import {
  GET_GAME_DETAIL,
  GENRE_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_GENRE,
  GET_ID_DETAIL,
  GET_VIDEOGAMES,
  CLEAR_DETAIL,
  ORIGIN_FILTER,
  GET_PLATFORMS,
} from "./constants";
import axios from "axios";
const { REACT_APP_RAWG_KEY } = process.env;

// export function getVideogames() {
//   return function (dispatch) {
//     axios
//       .get("http://localhost:3001/videogames")
//       .then((response) => {
//         dispatch({
//           type: GET_VIDEOGAMES,
//           payload: response.data,
//         });
//       })
//       .catch(() => {
//         console.log("ERROR EN DATOs");
//       });
//   };
// }

export const getVideogames = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/videogames");
  console.log(
    "🚀 ~ file: actions.js ~ line 32 ~ getVideogames ~ response",
    response
  );
  dispatch({
    type: GET_VIDEOGAMES,
    payload: response.data,
  });
};

const getDetail = (payload) => {
  return function (dispatch) {
    try {
      return axios
        .get(`http://localhost:3001/videogames?name=${payload}`)
        .then((json) => {
          dispatch({ type: GET_GAME_DETAIL, payload: json.data });
        });
    } catch (e) {
      dispatch({ type: "error", payload });
    }
  };
};

const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

const getGenre = () => {
  return function (dispatch) {
    return axios.get("http://localhost:3001/genres").then((json) => {
      dispatch({ type: GET_GENRE, payload: json.data });
    });
  };
};

const getPlatforms = () => {
  return function (dispatch) {
    return axios
      .get(`https://api.rawg.io/api/platforms?key=${REACT_APP_RAWG_KEY}`)
      .then((json) => {
        dispatch({ type: GET_PLATFORMS, payload: json.data.results });
      });
  };
};

const getDetailId = (payload) => {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogame/${payload}`)
      .then((json) => {
        dispatch({ type: GET_ID_DETAIL, payload: json.data });
      });
  };
};

const orderByName = (payload) => {
  return { type: ORDER_BY_NAME, payload };
};

const orderByRating = (payload) => {
  return { type: ORDER_BY_RATING, payload };
};

const filterByGenre = (payload) => {
  return { type: GENRE_FILTER, payload };
};

const filterByOrigin = (payload) => {
  return { type: ORIGIN_FILTER, payload };
};

export {
  getDetail,
  clearDetail,
  getDetailId,
  getGenre,
  // getVideogames,
  orderByName,
  orderByRating,
  filterByGenre,
  filterByOrigin,
  getPlatforms,
};
