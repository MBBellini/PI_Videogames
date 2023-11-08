const { Router } = require ("express");
const { getGenreHandler } = require('../handlers/genreHandler')

const genreRouter = Router()

genreRouter.get("/", getGenreHandler)

module.exports = genreRouter