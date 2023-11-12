import React from 'react'
import Card from '../Card/Card'
import "./cards.modules.css"

const Cards = ({info}) => {
  console.log(info);
  return (
    <div className='cards-cont'>{
        info?.map(v=><Card
        key={v.id}
        id= {v.id}
        image= {v.image}
        name= {v.name}
        genre= {v.genre}
        rating={v.rating}
        platform={v.platform}
        />)
    }
    </div>
  )
}

export default Cards