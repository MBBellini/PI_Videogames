const axios = require ('axios')
const {Videogame, Genre } = require('../db');

const { API_KEY } = process.env;

const getVideogameDb = async ()=>{
    const videogameDb = await Videogame.findAll({
        include: [{ 
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
        ]
    })
 
    const videogameMap = videogameDb.map(videogame=>{
       const {id, name, description, platform, image, release, rating, genre} = videogame
       return{
            id,
            name,
            description,
            platform,
            image,
            release,
            rating,
            genre: videogame.genres?.map(g => g.name).join(', '),
            created: videogame.createInDb
       }
    })
    return videogameMap;
}

   

const getVideogameApi = async () => {
    const pageSize = 100
    const allVideogames = []
    let nextPage = `https://api.rawg.io/api/games?key=${API_KEY}`

    while(allVideogames.length < pageSize && nextPage){
        const response = await axios(nextPage)
        const videogames = response.data.results?.map(videogame=>{
        return{
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platform: videogame.platforms?.map((p)=> p.platform.name).join(', '),
            image: videogame.background_image,
            release: videogame.released,
            rating: videogame.rating,
            genre: videogame.genres?.map(g => g.name).join(', '),
        }
    })
    allVideogames.push(...videogames)
    nextPage = response.data.next
};
    return allVideogames.slice(0, pageSize);
}

const getVideogamesId = async (id, source)=>{
    if(source === "dataB"){
        const db = await Videogame.findByPk({
            where: { id: id},
            include:{
                model: Genre,
                attributes: ["name"],
                through: {
                    genre: [],
                }
            }
        })
        const videogameDb= [{
            id: db.id,
            name: db.name,
            description: db.description,
            platform: db.platform,
            image: db.image,
            release: db.release,
            rating: db.rating,
            genre: db.genre.map((g)=> g.genre.name),
        }]
        return videogameDb
    } else{
        const api= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const info = await api.data;

        const videogameId =[{
            id: info.id,
            name: info.name,
            description: info.description,
            platform: info.platforms?.map((p)=> p.platform.name).join(', '),
            image: info.background_image,
            release: info.released,
            rating: info.rating,
            genre: info.genres?.map(g => g.name).join(', '), 
        }]
        return videogameId
    }
};

const getAllVg = async (name) => {
    const vgDb = await getVideogameDb();
    const vgAPi = await getVideogameApi();
const allVideogames = [...vgDb, ...vgAPi];

if(name){
    const vgFilter = allVideogames.filter(videogame => videogame.name.toLowerCase().includes(name.toLowerCase()))
    if(!vgFilter.length) throw new Error(`Videogame not found: ${name}`)
    return vgFilter
}

return allVideogames;
}

const createVideogame = async (name, description, platform, image, release, rating, genre) => {

    if(!image) image ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZp6jhcXdb71KHbdAaxTtlGLF0RqEfdY3JoQ&usqp=CAU"

    const videogame = await Videogame.create({
        name,
        description,
        platform,
        image,
        release,
        rating,
        genre
    });
    const searchGenre = await Genre.findAll({
        where: {
            name: genre
        }
    })
    await videogame.addGenre(searchGenre);
    return videogame
}
module.exports = {
    getAllVg,
    getVideogamesId,
    createVideogame,
}