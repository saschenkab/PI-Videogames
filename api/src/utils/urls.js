const { KEY } = process.env;

const apiBase = "https://api.rawg.io/api/";
const videogamesURL = `${apiBase}games?key=${KEY}`;
const videogamesSearch = `${apiBase}games?search=`;
const genresURL = `${apiBase}genres?key=${KEY}`;

module.exports = {
  apiBase,
  videogamesURL,
  videogamesSearch,
  genresURL,
};
