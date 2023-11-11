const { Router } = require ("express");
const { getPlatformHandler } = require('../handlers/platformHandler')

const platformRouter = Router()

platformRouter.get("/", getPlatformHandler)

module.exports = platformRouter