import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useEffect, useState} from "react";
export default function SearchForm(props){
    const {
        handleGetMovies,
        updateMovies,
        handlerIsShortFilms,
    } = props;

    const [movieName, setMovieName] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        setMovieName(localStorage.getItem('requestName'));
    },[updateMovies]);
    const handleMovieName = (e) => {
        const {value} = e.target;
        setIsError(false);
        setMovieName(value);
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(movieName){
            handleGetMovies(movieName); // смотря на какой странице вызывать разный обработкик movies saved-movies
            setIsError(false);
        } else {
            setIsError(true);
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
                               placeholder='Фильм' value={movieName} required/>
                        <button className='search-form__submit' type='submit' />
                    </div>
                    <FilterCheckbox
                        updateMovies={updateMovies}
                        handlerIsShortFilms={handlerIsShortFilms}
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