const { Router } = require('express');
const videogameRouter = require ('./videogameRouter')
const genreRouter = require('./genreRouter')
const platformRouter = require('./platformRouter')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/videogames", videogameRouter)

router.use("/genres", genreRouter)

router.use("/platforms", platformRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
