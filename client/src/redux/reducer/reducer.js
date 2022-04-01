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
} from "../constants";

const initialState = {
  videogames: [],
  gameDetail: {},
  genre: [],
  videogamesFilter: [],
  platforms: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        videogamesFilter: action.payload,
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_ID_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        gameDetail: {},
      };

    case GET_GAME_DETAIL:
      return {
        ...state,
        videogamesFilter: action.payload,
      };

    case GET_GENRE:
      return {
        ...state,
        genre: action.payload,
      };

    case ORDER_BY_NAME:
      let games = [...state.videogames];
      let gamesFiltered = [...state.videogamesFilter];
      let orderByGames = games.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          if (action.payload === "ascendent") {
            return -1;
          } else {
            return 1;
          }
        }

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          if (action.payload === "descendent") {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });

      let orderByGamesFiltered = gamesFiltered.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          if (action.payload === "ascendent") {
            return -1;
          } else {
            return 1;
          }
        }

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          if (action.payload === "descendent") {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });

      return {
        ...state,
        videogames: orderByGames,
        videogamesFilter: orderByGamesFiltered,
      };

    case ORDER_BY_RATING:
      let rating = [...state.videogames];
      let ratingFilterd = [...state.videogamesFilter];
      let orderByRating = rating.sort((a, b) => {
        if (a.rating < b.rating) {
          if (action.payload === "ascendent") {
            return -1;
          } else {
            return 1;
          }
        }

        if (a.rating > b.rating) {
          if (action.payload === "descendent") {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });
      let orderByRatingFiltered = ratingFilterd.sort((a, b) => {
        if (a.rating < b.rating) {
          if (action.payload === "ascendent") {
            return -1;
          } else {
            return 1;
          }
        }

        if (a.rating > b.rating) {
          if (action.payload === "descendent") {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });
      return {
        ...state,
        videogames: orderByRating,
        videogamesFilter: orderByRatingFiltered,
      };

    case GENRE_FILTER:
      let genre = [...state.videogames];
      let genreFiltered = genre.filter((game) =>
        game.genre.includes(action.payload)
      );
      return {
        ...state,
        videogamesFilter:
          action.payload === "All Games" ? genre : genreFiltered,
      };

    case ORIGIN_FILTER:
      let origin = [...state.videogames];
      let originFiltered =
        action.payload === "Api"
          ? origin.filter((game) => Number(game.id))
          : origin.filter((game) => isNaN(game.id));
      return {
        ...state,
        videogamesFilter: action.payload === "All" ? origin : originFiltered,
      };
    default:
      return state;
  }
};

export default rootReducer;
