import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAdd,
    heroesDelete,
    filtersApply
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: []
}



// 2-nd way

const heroes = createReducer(initialState, {
    [heroesFetching] : state => {
                            state.heroesLoadingStatus = 'loading'
                        },
    [heroesFetched] : (state, action) => {
                            state.heroesLoadingStatus = 'idle'
                            state.heroes = action.payload
                        },
    [heroesFetchingError]: state => {
                            state.heroesLoadingStatus = 'error'
                        },
    [filtersApply]: (state, action) => {
                            state.filteredHeroes = action.payload
                        },
    [heroesAdd]: (state, action) => {
                            state.heroes = action.payload
                        },
    [heroesDelete] : (state, action) => {
                            state.heroes = action.payload
                        }},
    [],
    state => state
)



// 1-st way

// const heroes = createReducer(initialState, builder => {
//     builder
//     .addCase(heroesFetching, state => {
//         state.heroesLoadingStatus = 'loading'
//     })
//     .addCase(heroesFetched, (state, action) => {
//         state.heroesLoadingStatus = 'idle'
//         state.heroes = action.payload
//     })
//     .addCase(heroesFetchingError, state => {
//         state.heroesLoadingStatus = 'error'
//     })
//     .addCase(filtersApply, (state, action) => {
//         state.filteredHeroes = action.payload
//     })
//     .addCase(heroesAdd, (state, action) => {
//         state.heroes = action.payload
//     })
//     .addCase(heroesDelete, (state, action) => {
//         state.heroes = action.payload
//     })
//     .addDefaultCase(() => {})
// })

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'FILTERS_APPLY':
//             return {
//                 ...state,
//                 filteredHeroes: action.payload
//             }
//         case 'HEROES_DELETE':
//             return {
//                 ...state,
//                 heroes: action.payload
//             }
//         case 'HEROES_ADD':
//             return {
//                 ...state,
//                 heroes: action.payload
//             }
//         default: return state
//     }
// }

export default heroes;