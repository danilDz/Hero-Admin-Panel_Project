import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: []
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading'
        },
        heroesFetched : (state, action) => {
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error'
        },
        filtersApply: (state, action) => {
            state.filteredHeroes = action.payload
        },
        heroesAdd: (state, action) => {
            state.heroes = action.payload
        },
        heroesDelete : (state, action) => {
            state.heroes = action.payload
        }
    }
})

const {actions, reducer} = heroesSlice

export default reducer
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAdd,
    heroesDelete,
    filtersApply
} = actions