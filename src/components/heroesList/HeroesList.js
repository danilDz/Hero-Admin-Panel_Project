import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        const newList = heroes.filter(item => item.id != id)  
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroesDelete(newList)))
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        if (activeFilter === 'all') {
            return arr.map(({id, ...props}) => {
                return <CSSTransition key={id} timeout={500} classNames='hero'>
                            <HeroesListItem onDelete={() => onDelete(id)} key={id} {...props}/>
                        </CSSTransition> 
            })
        }
        else {
            return arr.map(({id, element, ...props}) => {
                if (activeFilter === element) {
                    return <CSSTransition key={id} timeout={500} classNames='hero'>
                                <HeroesListItem onDelete={() => onDelete(id)} key={id} element={element} {...props}/>
                            </CSSTransition> 
                }
            })
        }
        
    }

    const elements = renderHeroesList(heroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
        
    )
}

export default HeroesList;