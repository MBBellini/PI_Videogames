const axios = require('axios')
const { Genre } = require('../db')
const { API_KEY } = process.env;

const getGenreApi = async () =>{

    const allData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

    const allGenres =  allData.data.results.map((g) => g.name)

    allGenres.forEach((g)=>{
            Genre.findOrCreate({
                where: { name: g }
            })
    })
    
    let oneGenre = await Genre.findAll()
    return oneGenre
}

module.exports ={
    getGenreApi
}