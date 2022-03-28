const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: []
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_APPLY':
            return {
                ...state,
                filteredHeroes: action.payload
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HEROES_ADD':
            return {
                ...state,
                heroes: action.payload
            }
        default: return state
    }
}

export default heroes;