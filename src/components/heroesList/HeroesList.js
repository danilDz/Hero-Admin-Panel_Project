import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import store from '../../store';

import { heroesDelete, fetchHeroes, selectAll } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {activeFilter} = useSelector(state => state.filters)
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const heroes = selectAll(store.getState())

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
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