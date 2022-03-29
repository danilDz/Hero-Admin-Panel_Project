import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request('http://localhost:3001/filters')
        .then(res => dispatch(filtersFetched(res)))
        .catch(() => dispatch(filtersFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction('HEROES_FETCHING')

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filtersChange = (filter) => {
    return {
        type: 'FILTERS_CHANGE',
        payload: filter
    }
}

// export const filtersApply = (heroes) => {
//     return {
//         type: 'FILTERS_APPLY',
//         payload: heroes
//     }
// }

export const filtersApply = createAction('FILTERS_APPLY')

// export const heroesDelete = (heroes) => {
//     return {
//         type: 'HEROES_DELETE',
//         payload: heroes
//     }
// }

export const heroesDelete = createAction('HEROES_DELETE')

// export const heroesAdd = (heroes) => {
//     return {
//         type: 'HEROES_ADD',
//         payload: heroes
//     }
// }

export const heroesAdd = createAction('HEROES_ADD')