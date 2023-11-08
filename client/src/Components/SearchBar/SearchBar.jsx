import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchGame } from '../../Redux/Actions'

const SearchBar = () => {

  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  const handleChange = (event) =>{
    setInput(event.target.value)
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(searchGame(input))
    document.getElementById("searchInput").value = "";
  }

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type='text' id='searchInput'/><input onClick={handleSubmit} type='submit'/>
     </form>
    </div>
  )
}

export default SearchBar