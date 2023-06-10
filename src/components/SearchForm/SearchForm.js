import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
export default function SearchForm(props){
    const {
        handleGetMovies,
        updateMovies,
        handleIsShortFilms,
        handleFilterSavedUserCards,
    } = props;

    const [movieName, setMovieName] = useState('');
    const [isError, setIsError] = useState(false);
    const {pathname} = useLocation();
    useEffect(()=>{
        if(pathname === '/movies'){
            setMovieName(localStorage.getItem('requestNameMovie'));
        }
        if(pathname === '/saved-movies'){
            setMovieName(localStorage.getItem('requestNameSaveMovie'));
        }
    },[updateMovies]);
    const handleMovieName = (e) => {
        const {value} = e.target;
        setIsError(false);
        setMovieName(value);
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(pathname === '/movies'){
            if(movieName){
                handleGetMovies(movieName);
                setIsError(false);
            } else {
                setIsError(true);
            }
        }
        if(pathname === '/saved-movies'){
            handleFilterSavedUserCards(movieName);
            setIsError(false);
        }
    }
    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form' onSubmit={handleSubmitForm} noValidate>
                    <div className='search-form__movie-search'>
                        <div className='search-form__search-icon'></div>
                        <input className='search-form__input' onChange={handleMovieName}
                               type='text'
                               placeholder='Фильм' value={movieName || ''} required/>
                        <button className='search-form__submit' type='submit' />
                    </div>
                    <FilterCheckbox
                        updateMovies={updateMovies}
                        handleIsShortFilms={handleIsShortFilms}
                        handleFilterSavedUserCards={handleFilterSavedUserCards}
                    />
                </form>
                <span
                    className={`search-form__input-error ${isError && 'search-form__input-error_visible'}`}>
                                Нужно ввести ключевое слово
                    </span>
                <div className='search-form__line'></div>
            </div>
        </section>
    )
}