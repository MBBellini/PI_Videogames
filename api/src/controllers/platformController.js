const axios = require('axios')
const { Platform } = require('../db')
const { API_KEY } = process.env;

const getPlatformApi = async () =>{

    const allData = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)

    const apiData =  allData.data.results

    apiData.forEach((p)=>{
            Platform.findOrCreate({
                where: { name: p.name }
            })
    })
    
    let onePlatform = await Platform.findAll()
    return onePlatform
 }

module.exports ={
    getPlatformApi
}