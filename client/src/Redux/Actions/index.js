import axios from "axios"
import { CLEAN_GAME_DETAIL, FILTER, FILTER_BY_GENRES, FILTER_BY_ORIGIN, GET_GAME, GET_GAME_DETAIL, GET_GENRES, PAGINATE, RESET, SEARCH_GAME } from "./action-types"


export function postGame(state){
    return async function(dispatch){
        try {
            await axios.post("http://localhost:3001/videogames/", state)
            alert("Juego creado con exito") 
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export function getGames(){
    return async function(dispatch){
        try {
            const response= await axios.get("http://localhost:3001/videogames/")
            dispatch({
                type: GET_GAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        try {
            const response= await axios.get("http://localhost:3001/genres/")
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filteredGenres(order){
    return async function(dispatch){
        try {
            dispatch({
                type: FILTER_BY_GENRES,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterOrigin(order){
    return async function(dispatch){
        try {
            dispatch({
                type: FILTER_BY_ORIGIN,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getGame(id){
    return async function(dispatch){
        try {
            const response= await axios.get(`http://localhost:3001/videogames/${id}`)
            dispatch({
                type: GET_GAME_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function page(order){
    return function(dispatch){
        dispatch({
            type: PAGINATE,
            payload: order
        })
    }
}
export function gamesFiltered(order){
    return function(dispatch){
        dispatch({
            type: FILTER,
            payload: order
        })
    }
}


export const cleanGameDetail= () =>{
    return { type: CLEAN_GAME_DETAIL}
}

export function gameReset(){
    return function(dispatch){
        dispatch({
            type: RESET
        })
    }
}

export function searchGame(videogame){
    return async function(dispatch){
        try {
            const response= await axios.get(`http://localhost:3001/videogames?name=${videogame}`)
            dispatch({
                type: SEARCH_GAME,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}
