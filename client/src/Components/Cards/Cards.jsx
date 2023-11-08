import React from 'react'
import Card from '../Card/Card'
import "./cards.modules.css"

const Cards = ({info}) => {
  return (
    <div className='cards-cont'>{
        info.map(v=><Card
        id= {v.id}
        image= {v.image}
        name= {v.name}
        genre= {v.genre}
        />)
    }
    </div>
  )
}

export default Cards