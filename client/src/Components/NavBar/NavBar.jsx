import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.modules.css"
import SearchBar from '../SearchBar/SearchBar'

const NavBar = () => {
  return (
    <div className='navbar-cont'>
    <div className='navbar-cont-img'>
      <Link className="navbar-link" to ="/"><img src="https://wallpaperaccess.com/full/2645205.jpg" alt="logo" /></Link>     
    </div>
    <div className='navbar-cont-links'><Link className= "navbar-link" to="/home">Home</Link>
    <Link className="navbar-link" to="/form">Formulario</Link>
    </div>
    <div className='navbar-cont-search'>
      <SearchBar/>
    </div>
     </div>
  )
}

export default NavBar