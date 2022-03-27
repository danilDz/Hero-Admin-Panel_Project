import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtersFetched, filtersFetching, filtersFetchingError, filtersChange, filtersApply } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

import '../../styles/index.scss';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus} = useSelector(state => state)
    const dispatch = useDispatch()
    const {request} = useHttp()
    const [activeFilter, setActiveFilter] = useState('all')

    useEffect(() => {
        dispatch(filtersFetching())
        request('http://localhost:3001/filters')
        .then(res => dispatch(filtersFetched(res)))
        .catch(() => dispatch(filtersFetchingError()))
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <p>Loading</p>
    } else if(filtersLoadingStatus === 'error') {
        return <p>Error</p>
    }

    const onClickButton = (name) => {
        setActiveFilter(name)
        dispatch(filtersChange(name))
    }

    const renderFilters = (filters, activeFilter) => {
        if (filters.length === 0) {
            return <p>Filters didn't found</p>
        }

        return filters.map((name) => {
            let btnClass = 'btn'
            let label = ''
            switch(name) {
                case 'all':
                    activeFilter === 'all' ? btnClass += " btn-outline-dark active" : btnClass += " btn-outline-dark"
                    label = 'Все'
                    break
                case 'fire':
                    activeFilter === 'fire' ? btnClass += " btn-danger active" : btnClass += " btn-danger"
                    label = 'Огонь'
                    break
                case 'water':
                    activeFilter === 'water' ? btnClass += " btn-primary active" : btnClass += " btn-primary"
                    label = 'Вода'
                    break
                case 'wind':
                    activeFilter === 'wind' ? btnClass += " btn-success active" : btnClass += " btn-success"
                    label = 'Ветер'
                    break
                case 'earth':
                    activeFilter === 'earth' ? btnClass += " btn-secondary active" : btnClass += " btn-secondary"
                    label = 'Земля'
                    break
            }

            return <button 
            onClick={() => onClickButton(name)} 
            key={name} 
            id={name} 
            className={btnClass}>{label}</button>
        })
    }

    const elements = renderFilters(filters, activeFilter)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;