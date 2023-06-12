import './FilterCheckbox.css';
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
export default function FilterCheckbox(props){
    const {
        updateMovies,
        handleIsShortFilms,
        handleFilterSavedUserCards,
        movieName,
    } = props

    const [checked, setChecked] = useState(false);
    const {pathname} = useLocation();
    localStorage.setItem('isShortFilmSaved', checked);
    useEffect(() => {
        if(pathname === '/movies'){
            setChecked(JSON.parse(localStorage.getItem('isShortFilm')));
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
                handleFilterSavedUserCards(movieName);
            }
        } else {
            if(pathname === '/movies'){
                localStorage.setItem('isShortFilm', true);
                handleIsShortFilms();
            }
            if(pathname === '/saved-movies'){
                localStorage.setItem('isShortFilmSaved', true);
                handleFilterSavedUserCards(movieName);
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