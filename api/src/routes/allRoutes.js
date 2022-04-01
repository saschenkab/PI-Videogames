const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { KEY } = process.env;
const { videogamesSearch, apiBase, genresURL } = require("../utils/urls");
const { getApiInfo } = require("../utils/API-controller");
const { Op } = require("sequelize");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (request, response) => {
  const { name } = request.query;
  if (name) {
    try {
      let json = await axios.get(`${videogamesSearch}${name}&key=${KEY}`);
      // console.log(json.data.results);
      let apiGames = json.data.results.map((game) => {
        return {
          id: game.id,
          name: game.slug,
          genre: game.genres.map((genre) => genre.slug),
          img: game.background_image,
          rating: game.rating,
        };
      });

      let databaseGames = await Videogame.findAll({
        where: {
          name: {
            [Op.like]: "%" + name.toLowerCase() + "%",
          },
        },
        include: { model: Genre },
      });

      databaseGames = databaseGames.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genre: game.genres ? game.genres.map((genre) => genre.name) : [],
          img: game.img,
          rating: game.rating,
        };
      });

      let games = [].concat(apiGames, databaseGames);

      if (games.length) return response.json(games);

      return response.json("Juego no Encontrado");
    } catch (e) {
      console.log(e);
      console.log("Ningun juego con ese Nombre");
      return response.json("Juego no Encontrado");
    }
  }
  let apiInfo = await getApiInfo();
  console.log(apiInfo.length);
  let databaseGame = await Videogame.findAll({ include: { model: Genre } });
  databaseGame = databaseGame.map((game) => {
    return {
      id: game.id,
      name: game.name,
      genre: game.genres.map((genre) => genre.name),
      img: game.img,
      rating: game.rating,
    };
  });
  // console.log(apiInfo);
  response.json(apiInfo.concat(databaseGame));
});

router.get("/videogame/:id", async (request, response) => {
  const { id } = request.params;
  try {
    let game = await axios.get(`${apiBase}games/${id}?key=${KEY}`);
    if (Object.keys(game.data).length > 1) {
      return response.json({
        id: game.data.id,
        name: game.data.slug,
        description: game.data.description,
        date: game.data.released,
        rating: game.data.rating,
        platforms: game.data.platforms.map(
          (platform) => platform.platform.slug
        ),
        genre: game.data.genres.map((game) => game.slug),
        img: game.data.background_image,
      });
    }
  } catch (e) {
    console.log("no se pudo hacer la request");
  }
  try {
    let databaseGame = await Videogame.findByPk(id, {
      include: {
        model: Genre,
      },
    });
    if (databaseGame)
      return response.json({
        id: databaseGame.id,
        name: databaseGame.name,
        description: databaseGame.description,
        date: databaseGame.date,
        rating: databaseGame.rating,
        platforms: databaseGame.platforms,
        genre: databaseGame.genres.map((game) => game.name),
        img: databaseGame.img,
      });
  } catch (e) {
    return response.json("ID INVALIDO");
  }
});

router.get("/genres", async (request, response) => {
  let json = await axios.get(`${genresURL}`);
  // console.log(json.data.results);
  let genres = json.data.results.map((genre) => genre.slug);
  // console.log(genres);
  let genresSaved = await Promise.all(
    genres.map(async (genre) => {
      return await Genre.findOrCreate({
        where: {
          name: genre,
        },
      });
    })
  );
  return response.json(genresSaved);
});

router.post("/videogame", async (request, response) => {
  const { name, description, date, rating, platforms, genre, img } =
    request.body;

  if (!img) {
    var imagen =
      "https://pbs.twimg.com/profile_images/1427313736310743048/8auIbcu6_400x400.jpg";
  }
  let genres = await Promise.all(
    genre.map(async (genre) => await Genre.findAll({ where: { name: genre } }))
  );
  // console.log(genres);
  let videogame = await Videogame.create({
    name: name.toLowerCase(),
    description,
    date,
    rating,
    platforms,
    img: img ? img : imagen,
  });
  await videogame.setGenres(genres.flat());
  // console.log(videogame);
  //add agrega y no elimina lo anterior
  return response.json(videogame);
});

module.exports = router;
