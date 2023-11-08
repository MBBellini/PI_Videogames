import React from 'react'
import "./card.modules.css"
import { Link } from 'react-router-dom'

const Card = ({image, name, genre, id }) => {
  return (
    <div className='card-cont'>
    <div className='card-cont-title'>
<Link to={`/details/${id}`}><h2>{name}</h2></Link>
    </div>
    <div className='card-cont-img'>
      <img src={image} alt='img'></img>
    </div>
    <div className='card-cont-info'>
      <label>nombre: </label>
      <span>{name}</span>
      <br/>
      <label>genero: </label>
      <span>{genre}</span>
      <br/>
    </div>

    </div>
  )
}

export default Card