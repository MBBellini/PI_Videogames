import React, {useEffect} from 'react'
import Cards from '../../Components/Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { filterOrigin, filteredGenres, gameReset, gamesFiltered, getGames, getGenres, page } from '../../Redux/Actions'
import "./home.modules.css"


const Home = () => {
  const dispatch = useDispatch()
  
  const allGames = useSelector(state=> state.allGames)
  const allGenres = useSelector(state=> state.allGenres)
  const currentPage = useSelector(state=> state.currentPage)

  useEffect(()=>{
    dispatch(getGames())
    dispatch(getGenres())
  },[])

  const filters= (e) =>{
    dispatch(gamesFiltered(e.target.name))
  }

  const filterByGenre= (event) =>{
    dispatch(filteredGenres(event.target.value))
  }

  const pagination = (e) =>{
    dispatch(page(e.target.name))
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
        <button onClick={reset}> Reset</button>
        <div>
          <label>Filtros/Ordenamiento</label>
          <div>
            <button  onClick={filterByOrigin} name={"DB"}> Data Base</button><button  onClick={filterByOrigin}name={"API"}>API</button>
          </div>
          <div>
          <select name='filterByGenre' onChange={filterByGenre}>   //!cuando filtro por genero por default que vuelva al genero en el value
            <option>filtro por genero </option>   
          {
          allGenres?.map((g)=><option key={g.name} value={g.name}>{g.name}</option>)
          }
          </select>
          </div>
          <button name='AZ' onClick={filters}>A-Z</button>
          <button name='ZA' onClick={filters}>Z-A</button>
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