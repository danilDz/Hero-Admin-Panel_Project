export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

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

export const filtersApply = (heroes) => {
    return {
        type: 'FILTERS_APPLY',
        payload: heroes
    }
}

export const heroesDelete = (heroes) => {
    return {
        type: 'HEROES_DELETE',
        payload: heroes
    }
}

export const heroesAdd = (heroes) => {
    return {
        type: 'HEROES_ADD',
        payload: heroes
    }
}