import React, { useEffect, useState } from 'react'
import { getGames, getGenres, postGame, getPlatforms } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import "./form.modules.css"

const Form = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state)=>state.allGenres);  
  const allPlatforms = useSelector((state=>state.allPlatforms))
  
  useEffect(()=>{
    dispatch(getGames())
    dispatch(getGenres())
    dispatch(getPlatforms())
  }, [])

  const[state, setState] = useState({
    name: "",
    description: "",
    platform: [],
    image: "",
    release: "",
    rating: "",
    genre: []
  });

  const[errors, setErrors] = useState({
    name: "",
    description: "",
    platform: [],
    image: "",
    release: "",
    rating: "",
    genre: []
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

    if(name==="platform"){
      if(!state.platform.length) setErrors({...errors, platform:"Minimo una plataforma es requerida"})
      else setErrors({...errors, platform: ""})
    }

    if(name==="image"){
      const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if(regex.test(state.image)){
        setErrors({...errors, image:""})
      }else{
        setErrors({...errors, image:"La imagen debe ser una URL."})
      }
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
    if(name==="genre"){
      if(!state.genre.length) setErrors({...errors, genre:"Minimo un genero requerido"})
      else setErrors({...errors, genre: ""})
    }
  }

  const handleChange= (event) =>{

    if(event.target.name === "genre"){
      if(state.genre.includes(event.target.value)) return
      setState({
        ...state,
        [event.target.name] : [...state[event.target.name], event.target.value]
    })
  
  }else if(event.target.name === "platform"){
      if(state.platform.includes(event.target.value)) return
      setState({
        ...state,
        [event.target.name] : [...state[event.target.name], event.target.value]
    })
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

     const handleSubmit = (event) =>{
      event.preventDefault();
      dispatch(postGame(state));
    }

  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' name='name' placeholder='name'/>
        <span>{errors.name}</span>
        <input onChange={handleChange} type='text' name='description' placeholder='desciption'/>
        <input onChange={handleChange} type='text' name='image' placeholder='image'/>
        <span>{errors.image}</span>
        <input onChange={handleChange} type='text' name='release' placeholder='release'/>
        <span>{errors.release}</span>
        <input onChange={handleChange} type='text' name='rating' placeholder='rating'/>
        <span>{errors.rating}</span>
        <div>
        <label>Generos: </label>
        {/* <select  onChange={handleChange} name="genre" id='genre'>{
          allGenres?.map((g)=><option name={g.name} key={g.id} value={g.name}>{g.name}</option>)
        }
        </select> */}
        <select  onChange={handleChange}name='genre' id=''>{
          allGenres?.map((g)=><option key={g} value={g.name}>{g.name}</option>)
        }
        </select>
        <div>
        {
          state.genre?.map(g => <div><span id={g}>{g}</span><button type='button' name='genre' id={g} onClick={remove}>X</button></div>)
        }
        </div>
        </div>
        <div>
      <label>Plataformas: </label> 
      {/* <select  onChange={handleChange} name="platform" id='platform'>{
          allPlatforms?.map((p)=><option key={p.id} name={p.name} value={p.name}>{p.name}</option>)
        }
        </select>   */}
       <select  onChange={handleChange}name='platform' id=''>{
          allPlatforms?.map((p)=><option key={p} value={p.name}>{p.name}</option>)
        }
        </select>        
        </div>
        {
          state.platform?.map(p => <div><span id={p}>{p}</span><button type='button'name='platform' id={p} onClick={remove}>X</button></div>)
        }
        <input disabled={buttonDisabled()} type="submit"/>
      </form>
    </div>
    
  )
}


export default Form