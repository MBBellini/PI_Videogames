import React, { useEffect }from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { cleanGameDetail, getGame } from '../../Redux/Actions';
import "./details.modules.css"


const Details = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const gameDetail = useSelector((state)=> state.gameDetail)

  useEffect(()=>{
    dispatch(getGame(params.id))
    return()=>{ dispatch(cleanGameDetail())
    }

  },[])

  return (
    <div className='details-cont'>
      <div>
        <label>ID: </label>
        <p>{gameDetail?.id}</p>
      </div>
      <div><img src={gameDetail.image} alt='image'/></div>
      <div>
        <label>Nombre: </label>
        <h1>{gameDetail?.name}</h1>     
        <label>Genero: </label>
        <p>{gameDetail?.genre}</p>
        <label>Plataformas: </label>
        <p>{gameDetail?.platform}</p>
        <label>Fecha de lanzamiento: </label>
        <p>{gameDetail.release}</p>
        <label>Rating: </label>
        <p>{gameDetail.rating}</p>
        <label>Descripcion: </label>
        <strong>{gameDetail.description}</strong>
      </div>
    </div>
  )
}

export default Details