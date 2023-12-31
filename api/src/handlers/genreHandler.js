const { getGenreApi } = require('../controllers/genreControllers')

const getGenreHandler = async (req, res)=>{
    try {
        const results = await getGenreApi()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports= {getGenreHandler};