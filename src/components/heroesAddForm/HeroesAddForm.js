import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroesAdd } from '../../actions';

import './heroesAddForm.scss'

const HeroesAddForm = () => {

    const {heroes} = useSelector(state => state.heroes)
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch()

    const {request} = useHttp()

    const formik = useFormik({
        initialValues: {
            name: '',
            text: '',
            element: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Min 2 digits!').required('Required!'),
            text: Yup.string().min(10, 'Min 10 digits!').required('Required!'),
            element: Yup.string().required('Choose element!')
        }),
        onSubmit: values => {
            const id = uuidv4()
            const newHero = {
                id: id,
                name: formik.values.name,
                description: formik.values.text,
                element: formik.values.element
            }
            const newList = [...heroes, newHero]
            request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
            .then(dispatch(heroesAdd(newList)))
            .then(formik.resetForm())
            .catch(err => console.log(err))
        } 
    })

    const renderFilters = (filters, filtersLoadingStatus) => {
        if (filtersLoadingStatus === 'loading') {
            return <option>Loading</option>
        } else if(filtersLoadingStatus === 'error') {
            return <option>Error</option>
        }

        return filters.map((name) => {
            let label = ''
            switch(name) {
                case 'all':
                    label = 'Я владею элементом...'
                    break
                case 'fire':
                    label = 'Огонь'
                    break
                case 'water':
                    label = 'Вода'
                    break
                case 'wind':
                    label = 'Ветер'
                    break
                case 'earth':
                    label = 'Земля'
                    break
            }

            return <option key={name} value={name}>{label}</option>
        })
    }
    
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    {...formik.getFieldProps('name')}/>
                {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    {...formik.getFieldProps('text')}/>
                {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    className="form-select" 
                    id="element" 
                    name="element" 
                    {...formik.getFieldProps('element')}>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
                {formik.errors.element && formik.touched.element ? <div className="error">{formik.errors.element}</div> : null}
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;