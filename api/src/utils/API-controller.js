const axios = require("axios");
const { KEY } = process.env;

async function getApiInfo() {
  let pages = [1, 2, 3, 4, 5];
  pages = await Promise.all(
    pages.map(async (num) => {
      let json = await axios.get(
        `https://api.rawg.io/api/games?key=${KEY}&page=${num}`
      );
      // console.log(json.data.results);
      return json.data.results;
    })
  );

  return await Promise.all(
    pages.flat().map(async (game) => {
      let description = await axios.get(
        `http://localhost:3001/videogame/${game.id}`
      );
      description = description.data.description;
      return {
        id: game.id,
        name: game.slug,
        description: description,
        date: game.released,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.slug),
        genre: game.genres.map((game) => game.slug),
        img: game.short_screenshots[0].image,
      };
    })
  );
}

module.exports = { getApiInfo };
