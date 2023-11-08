const { Router } = require ("express");
const {
    getVideogamesHandler, getVideogameHandler, createVideogameHandler
} = require("../handlers/videogameHandler")

const videogameRouter = Router();

videogameRouter.get("/", getVideogamesHandler);

videogameRouter.get("/:id", getVideogameHandler);

videogameRouter.post("/", createVideogameHandler);

module.exports = videogameRouter;