import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {useEffect, useState} from "react";
export default function SearchForm(props){
    const {
        handleGetMovies,
        setIsShortFilm,
        updateMovies
    } = props;

    const [movieName, setMovieName] = useState('');

    useEffect(()=>{
        setMovieName(localStorage.getItem('requestName'));
    },[updateMovies]);
    const handleMovieName = (e) => {
        const {value} = e.target;
        setMovieName(value);
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleGetMovies(movieName);
    }

    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form' onSubmit={handleSubmitForm}>
                    <div className='search-form__movie-search'>
                        <div className='search-form__search-icon'></div>
                        <input className='search-form__input' onChange={handleMovieName}
                               type='text'
                               placeholder='Фильм' value={movieName} required/>
                        <button className='search-form__submit' type='submit' />
                    </div>
                    <FilterCheckbox setIsShortFilm={setIsShortFilm} updateMovies={updateMovies}/>
                </form>
                <div className='search-form__line'></div>
            </div>
        </section>
    )
}