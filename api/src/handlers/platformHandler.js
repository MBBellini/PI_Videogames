const { getPlatformApi } = require('../controllers/platformController')

const getPlatformHandler = async (req, res)=>{
    try {
        const results = await getPlatformApi()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports= {getPlatformHandler};