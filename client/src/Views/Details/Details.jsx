import React, { useEffect }from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { cleanGameDetail, getGame } from '../../Redux/Actions';
import "./details.modules.css"


const Details = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const gameDetail = useSelector((state)=> state.gameDetail)
  console.log(gameDetail);

  useEffect(()=>{
    dispatch(getGame(params.id))
    return()=>{ dispatch(cleanGameDetail())
    }

  },[])

  return (
    <div className='details-cont'>
      <div>
        <label>ID: </label>
        <p>{gameDetail[0]?.id}</p>
      </div>
      <div><img src={gameDetail[0]?.image} alt='imagen'/></div>
      <div>
        <label>Nombre: </label>
        <h1>{gameDetail[0]?.name}</h1>
        <label>Genero: </label>
        <p>{gameDetail[0]?.genre}</p>
        <label>Plataformas: </label>
        <p>{gameDetail[0]?.platform}</p>
        <label>Fecha de lanzamiento: </label>
        <p>{gameDetail[0]?.release}</p>
        <label>Rating: </label>
        <p>{gameDetail[0]?.rating}</p>
        <label>Descripcion: </label>
        <strong>{gameDetail[0]?.description}</strong>
      </div>
    </div>
  )
}

export default Details