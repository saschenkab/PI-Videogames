const { Router } = require("express");
const router = require("./allRoutes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require("./allRoutes");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogameRouter);

module.exports = router;
