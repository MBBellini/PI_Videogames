const{
    getAllVg,
    getVideogamesId,
    createVideogame,
} = require("../controllers/videogameControllers")

const getVideogamesHandler = async(req, res) => {
    try {
    const { name } = req.query
      const videogame = await getAllVg(name);
      res.status(200).json(videogame)  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVideogameHandler = async (req, res) =>{
    const {id} = req.params
    try {
        const vg = await getVideogamesId(id);
        res.status(200).json(vg)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const createVideogameHandler = async(req, res) =>{
    try {
        const{name, description, platform, image, release, rating, genre} = req.body;
        const vg = await createVideogame(name, description, platform, image, release, rating, genre);
        res.status(200).json("Videogame created succesfully")
    } catch (error) {
        res.status(402).json({error: error.message})
    }
}
module.exports = {
    getVideogamesHandler,
    getVideogameHandler,
    createVideogameHandler
}