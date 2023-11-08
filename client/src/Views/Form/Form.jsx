import React, { useEffect, useState } from 'react'
import { getGames, getGenres, postGame } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import "./form.modules.css"

const Form = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state)=>state.allGenres);
  
  //const allPlatforms = useSelector((state=>state.allPlatforms))
  
  useEffect(()=>{
    dispatch(getGames())
    dispatch(getGenres())
  }, [])

  const[state, setState] = useState({
    name: "",
    description: "",
    //platform: [],
    image: "",
    release: "",
    rating: "",
    genres: []
  });

  const[errors, setErrors] = useState({
    name: "",
    description: "",
    //platform: "",
    image: "",
    release: "",
    rating: "",
    genres: []
  });

  const validate = (state, name) =>{
    if(name=== "name"){
      
      if(state.name === "")setErrors({...errors, name: "El nombre es requerido"})
      else if(state.name.length >= 15) setErrors({...errors, name:"El nombre es muy largo"})
    else setErrors({...errors, name:""})
    }

    if(name==="description"){
    if(!state.description === "") setErrors({...errors, description: "Descripcion es requerida"})
     else if(state.description.length > 1000) setErrors({...errors, description: "Descripcion muy larga. Max = 1000 caracteres"})
    else setErrors({...errors, description: ""})      
  }
    // if(name==="platform"){
    //   if(!state.platform.length) setErrors({...errors, platform:"Minimo una plataforma es requerida"})
    //   else setErrors({...errors, platform: ""})
    // }

    if(name==="image"){
    }
    if(name==="release"){
      const dataReggex = /^\d{4}-\d{2}-\d{2}$/;
      if(
        state.release.trim() !== "" &&
        dataReggex.test(state.release)
      ){
        setErrors({...errors, release: ""})
      } else{
        setErrors({...errors, release: "El dato debe ser una fecha en formato 'yyyy-mm-dd",})
      }
    }
    if(name==="rating"){
      if(isNaN(parseInt(state.rating))) setErrors({...errors, rating: "El dato debe ser un numero"})
      else if (state.rating > 5 || state.rating < 0){errors.rating = "Rating debe ser de 0 a 5"}
      else setErrors({...errors, rating:""})
    }
    if(name==="genres"){
      if(!state.genres.length) setErrors({...errors, genres:"Minimo un genero requerido"})
      else setErrors({...errors, genres: ""})
    }
  }

  const handleChange= (event) =>{

    if(event.target.name === "genres"){
      if(state.genres.includes(event.target.value)) return
      setState({
        ...state,
        [event.target.name] : [...state[event.target.name], event.target.value]
    })
  
  // }else if(event.target.name === "platform"){
  //     let value = document.getElementById(event.target.name).value
  //     setState({
  //       ...state,
  //       [event.target.name] : [...state[event.target.name], value]
  //   })
    } else{   
    setState({
      ...state,
      [event.target.name] : event.target.value
    })
  }
  //RE-RENDERIZADO
    validate({
      ...state,
      [event.target.name]: event.target.value}, 
      event.target.name)
   return
  }

    const buttonDisabled = ()=>{
      let disabledAux = true;
      for(let error in errors){
        if(errors[error]=== "") disabledAux = false;
        else{
          disabledAux = true;
          break;
        }
      }
      return disabledAux;
    }
  
    const remove = (event) =>{
      setState({
        ...state,
        [event.target.name] : [...state[event.target.name].filter(X => X !==event.target.id)]
      })
    
    }

    console.log(state);

     const handleSubmit = (event) =>{
      event.preventDefault();
      dispatch(postGame(state));

      // for(let property in state){
      //   document.getElementById(property).value = ""
      // }
    }

  return (
    <div className='form-cont'>
     {console.log(allGenres)}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' placeholder='name'/>
        <span>{errors.name}</span>
        <input onChange={handleChange} type='text' name='description' placeholder='desciption'/>
        <input onChange={handleChange} type='text' name='image' placeholder='image'/>
        <input onChange={handleChange} type='text' name='release' placeholder='release'/>
        <span>{errors.release}</span>
        <input onChange={handleChange} type='text' name='rating' placeholder='rating'/>
        <span>{errors.rating}</span>
        <div>
        <label>Generos: </label>
        <select  onChange={handleChange}name='genres' id=''>{
          allGenres?.map((g)=><option key={g.name} value={g.name}>{g.name}</option>)
        }
        </select>
        <div>
        {
          state.genres?.map(g => <div><span id={g}>{g}</span><button type='button' name='genres' id={g} onClick={remove}>X</button></div>)
        }
        </div>
        </div>
        {/* <div>
      <label>Plataformas: </label>      
      <input type='text' name='platform' id='platform'/>
        <button onClick={handleChange} name='platform' type='button'>Agregar</button>
        </div>
        {
          state.platform.map(p => <div><span id={p}>{p}</span><button type='button'name='platform' id={p} onClick={remove}>X</button></div>)
        } */}
        <input disabled={buttonDisabled()} type="submit"/>
      </form>
    </div>
    
  )
}


export default Form