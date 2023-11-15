import { CLEAN_GAME_DETAIL, FILTER, FILTER_BY_GENRES, FILTER_BY_ORIGIN, FILTER_BY_PLATFORM, FILTER_BY_RATING, GET_GAME, GET_GAME_DETAIL, GET_GENRES, GET_PLATFORMS, PAGINATE, RESET, SEARCH_GAME } from "../Actions/action-types";


let initialState = {
    allGames:[],
    allGenres:[],
   allGamesBackUp:[],
   allPlatforms: [],
    gameDetail:{},
    gamesFiltered:[],
    filters:false,
    currentPage:0
}

function rootReducer(state= initialState, action){

    const ITEMS_PER_PAGE = 15;


    switch (action.type) {
        case GET_GAME:
            return{
                ...state,
                allGames: [...action.payload].splice(0, ITEMS_PER_PAGE),
                allGamesBackUp: action.payload
            }

        case SEARCH_GAME:
            return{
                ...state,
                allGames: [...action.payload].splice(0, ITEMS_PER_PAGE),
                gamesFiltered: action.payload,
                filters: true,
                currentPage: 0
            }

        case GET_GENRES:
            return{
                ...state,
                allGenres: action.payload
            }   

        case FILTER_BY_GENRES:
            return{
                ...state,
                allGames: [...state.allGamesBackUp].filter(videogame=> videogame.genre.includes(action.payload)).splice(0, ITEMS_PER_PAGE),
                gamesFiltered: [...state.allGamesBackUp].filter(videogame=> videogame.genre.includes(action.payload)),
                filters: true,
                currentPage: 0
            }


        case GET_PLATFORMS:
            return{
                ...state,
                allPlatforms: action.payload
            }  

        case FILTER_BY_PLATFORM:
            return{
                ...state,
                allGames: [...state.allGamesBackUp].filter(videogame=> videogame.platform.includes(action.payload)).splice(0, ITEMS_PER_PAGE),
                gamesFiltered: [...state.allGamesBackUp].filter(videogame=> videogame.platform.includes(action.payload)),
                filters: true,
                currentPage: 0
            }    
                    
            case FILTER_BY_ORIGIN:
                if(action.payload === "DB"){
                return{
                    ...state,
                    allGames: [...state.allGamesBackUp].filter(videogame=> videogame.hasOwnProperty("created")).splice(0, ITEMS_PER_PAGE),
                    gamesFiltered: [...state.allGamesBackUp].filter(videogame=> isNaN(parseInt(videogame.id))),
                    filters: true,
                    currentPage: 0
                }
            }else{
                return{
                    ...state,
                allGames: [...state.allGamesBackUp].filter(videogame=> !videogame.hasOwnProperty("created")).splice(0, ITEMS_PER_PAGE),
                gamesFiltered: [...state.allGamesBackUp].filter(videogame=> !isNaN(parseInt(videogame.id))),
                filters: true,
                currentPage: 0
                }
            }

        case GET_GAME_DETAIL:
            return{
                ...state,
                gameDetail: action.payload
            } 

        case PAGINATE:
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage -1;
            const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE;

            if(state.filters){
                if(action.payload === "next" && firstIndex >= state.gamesFiltered.length) return state
                else if(action.payload === "prev" && prev_page < 0)
                return state
                    return{
                        ...state,
                        allGames: [...state.gamesFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                        currentPage: action.payload === "next" ? next_page: prev_page
                }
            }

            if(action.payload === "next" && firstIndex >= state.allGamesBackUp.length) return state
            if(action.payload === "prev" && prev_page < 0) return state                


            return{
                ...state,
                allGames: [...state.allGamesBackUp].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === "next" ? next_page : prev_page
            }

        case FILTER:
            switch(action.payload){
                case "AZ":
                    let asc = []
                    if(state.filters){
                        asc = [...state.gamesFiltered].sort((prev, next)=>{
                            if(prev.name.toLowerCase() >next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return -1
                            return 0
                        })
                        return{
                            ...state,
                            allGames: [...asc].splice(0, ITEMS_PER_PAGE),
                            gamesFiltered: asc,
                            currentPage: 0
                        }
                    }else{
                        asc = [...state.allGamesBackUp].sort((prev, next)=>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return 1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return -1
                            return 0
                        })
                        return{
                            ...state,
                            allGames: [...asc].splice(0, ITEMS_PER_PAGE),
                            allGamesBackUp: asc,
                            currentPage: 0
                        }
                    }
                case "ZA":
                    let desc = []
                    if(state.filters){
                        desc = [...state.gamesFiltered].sort((prev, next)=>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return 1
                            return 0
                        })
                        return{
                            ...state,
                            allGames: [...desc].splice(0, ITEMS_PER_PAGE),
                            gamesFiltered: desc,
                            currentPage: 0
                        }
                    }else{
                        desc = [...state.allGamesBackUp].sort((prev, next)=>{
                            if(prev.name.toLowerCase()>next.name.toLowerCase()) return -1
                            if(prev.name.toLowerCase()<next.name.toLowerCase()) return 1
                            return 0
                        })
                        return{
                            ...state,
                            allGames: [...desc].splice(0, ITEMS_PER_PAGE),
                            allGamesBackUp: desc,
                            currentPage: 0
                       }
                    }
            default: return state

            }
        
            case FILTER_BY_RATING:
                switch(action.payload){
                    case "Min":
                        let min = []
                        if(state.filters){
                            min = [...state.gamesFiltered].sort((prev, next)=>{
                                if(prev.rating > next.rating) return 1
                                if(prev.rating < next.rating) return -1
                                return 0
                            })
                            return{
                                ...state,
                                allGames: [...min].splice(0, ITEMS_PER_PAGE),
                                gamesFiltered: min,
                                currentPage: 0
                            }
                        }else{
                            min = [...state.allGamesBackUp].sort((prev, next)=>{
                                if(prev.rating >next.rating) return 1
                                if(prev.rating <next.rating) return -1
                                return 0
                            })
                            return{
                                ...state,
                                allGames: [...min].splice(0, ITEMS_PER_PAGE),
                                allGamesBackUp: min,
                                currentPage: 0
                            }
                        }
                    case "Max":
                        let max = []
                        if(state.filters){
                            max = [...state.gamesFiltered].sort((prev, next)=>{
                                if(prev.rating >next.rating) return -1
                                if(prev.rating <next.rating) return 1
                                return 0
                            })
                            return{
                                ...state,
                                allGames: [...max].splice(0, ITEMS_PER_PAGE),
                                gamesFiltered: max,
                                currentPage: 0
                            }
                        }else{
                            max = [...state.allGamesBackUp].sort((prev, next)=>{
                                if(prev.rating >next.rating) return -1
                                if(prev.rating <next.rating) return 1
                                return 0
                            })
                            return{
                                ...state,
                                allGames: [...max].splice(0, ITEMS_PER_PAGE),
                                allGamesBackUp: max,
                                currentPage: 0
                           }
                        }
                default: return state
    
                }
                            
        

        case CLEAN_GAME_DETAIL:
                return{
                    ...state,
                    gameDetail: {}
                }    
    
                
        case RESET:
            return{
                ...state,
                allGames: [...state.allGamesBackUp].splice(0, ITEMS_PER_PAGE),
                gamesFiltered: [],
                filters: false,
                currentPage: 0
            }    
            
        default: return state
    }
}

export default rootReducer;