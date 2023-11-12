import React, {useEffect} from 'react'
import Cards from '../../Components/Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { filterOrigin, filteredGenres, filteredPlatform, gameReset, gamesFiltered, getGames, getGenres, getPlatforms, page, ratingFiltered } from '../../Redux/Actions'
import "./home.modules.css"


const Home = () => {
  const dispatch = useDispatch()
  
  const allGames = useSelector(state=> state.allGames)
  const allGenres = useSelector(state=> state.allGenres)
  const allPlatforms = useSelector(state=> state.allPlatforms)
  const currentPage = useSelector(state=> state.currentPage)

  useEffect(()=>{
    dispatch(getGames())
    dispatch(getGenres())
    dispatch(getPlatforms())
  },[])

  const filters= (event) =>{
    dispatch(gamesFiltered(event.target.name))
  }

  const filterByRating= (event) =>{
    dispatch(ratingFiltered(event.target.name))
  }

  const filterByGenre= (event) =>{
    dispatch(filteredGenres(event.target.value))
  }

  const filterByPlatform= (event) =>{
    dispatch(filteredPlatform(event.target.value))
  }

  const pagination = (event) =>{
    dispatch(page(event.target.name))
  }

  const reset = ()=> {
    dispatch(gameReset())
  }

  const filterByOrigin= (event)=>{
    dispatch(filterOrigin(event.target.name))
  }

  return (
    <div className='home-cont'>
      <div>
        <div>
          <button className='button-cont' onClick={reset}> Reset</button>
        </div>
          <label>Filtros/Ordenamiento</label>
          <div>
            <button onClick={filterByOrigin} name={"DB"}> Data Base</button><button  onClick={filterByOrigin}name={"API"}>API</button>
          </div>
          <div>
          <select name='filterByGenre' onChange={filterByGenre}>   
            <option>filtro por genero </option>   
          {
          allGenres?.map((g)=><option key={g.name} value={g.name}>{g.name}</option>)
          }
          </select>
          </div>
          <div>
            <select name='filterByPlatform' onChange={filterByPlatform}>
              <option>filtro por plataforma </option>{
                allPlatforms?.map((p)=><option key={p.name} value={p.name}>{p.name}</option>)
              }
            </select>
          </div>
          <div>
            <label>Alfabeticamente</label>
            <button name='AZ' onClick={filters}>A-Z</button>
            <button name='ZA' onClick={filters}>Z-A</button>
          </div>          
          <div>
          <label>Rating</label>
          <button name='Min' onClick={filterByRating}>Min</button>
          <button name='Max' onClick={filterByRating}>Max</button>
          </div>
        <div>
          <h3>currentPage: {currentPage +1}</h3> 
        </div>
        <div>
          <label>Paginado</label>
          <button name='prev' onClick={pagination}>Prev</button>
          <button name='next' onClick={pagination}>Next</button>
        </div>
        <Cards info={allGames}/>
      </div>      
    </div>
  )
}

export default Home