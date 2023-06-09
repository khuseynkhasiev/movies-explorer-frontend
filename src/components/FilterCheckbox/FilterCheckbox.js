import './FilterCheckbox.css';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
export default function FilterCheckbox(props){
    const {
        updateMovies,
        handleIsShortFilms,
        handleFilterSavedUserCards,
    } = props

    const [checked, setChecked] = useState(false);
    const {pathname} = useLocation();
    useEffect(() => {
        if(pathname === '/movies'){
            setChecked(JSON.parse(localStorage.getItem('isShortFilm')));
        }
        if(pathname === '/saved-movies'){
            setChecked(JSON.parse(localStorage.getItem('isShortFilmSaved')));
        }
    }, [updateMovies])
    const handleCheckedShortFilm = () => {
        setChecked(!checked);
        if(checked) {
            if(pathname === '/movies'){
                localStorage.setItem('isShortFilm', false);
                handleIsShortFilms();
            }
            if(pathname === '/saved-movies'){
                localStorage.setItem('isShortFilmSaved', false);
                handleFilterSavedUserCards(localStorage.getItem('requestNameSaveMovie'));
            }
        } else {
            if(pathname === '/movies'){
                localStorage.setItem('isShortFilm', true);
                handleIsShortFilms();
            }
            if(pathname === '/saved-movies'){
                localStorage.setItem('isShortFilmSaved', true);
                handleFilterSavedUserCards(localStorage.getItem('requestNameSaveMovie'));
            }
        }
    }
    return (
        <div className='filter-checkbox'>
            <div className='filter-checkbox__line'></div>
            <div className='filter-checkbox__radio-block'>
                <input className='filter-checkbox__radio'
                       onChange={handleCheckedShortFilm}
                       type='checkbox' id='short-films'
                       name='short-films'
                       checked={checked}
                />
                <label className='filter-checkbox__label' htmlFor='short-films'></label>
            </div>
            <label className='filter-checkbox__text'>Короткометражки</label>
        </div>
    )
}