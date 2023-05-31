import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";
import Menu from "../Menu/Menu";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import './Movies.css';

export default function Movies(props){
    const {
        preloaderActive,
        updateMovies,
        handlerPostSavedCard,
        handlerMenuIsActive,
        handlerButtonLogo,
        handlerButtonSavedMovies,
        handlerButtonMovies,
        handlerButtonProfile,
        handleGetMovies,
        setIsShortFilm,
        getMoviesIsError,
        savedUserCards,
    } = props;

    const [moviesCards, setMoviesCards] = useState([]);

    useEffect(()=>{
        setMoviesCards(JSON.parse(localStorage.getItem('movies')));
    },[updateMovies]);
    return (
        <div className='movies'>
            <div className='movies__container'>
                <HeaderResult
                    handlerMenuIsActive={handlerMenuIsActive}
                    handlerButtonLogo={handlerButtonLogo}
                    handlerButtonSavedMovies={handlerButtonSavedMovies}
                    handlerButtonMovies={handlerButtonMovies}
                    handlerButtonProfile={handlerButtonProfile}/>
                <SearchForm
                    handleGetMovies={handleGetMovies}
                    setIsShortFilm={setIsShortFilm}
                    updateMovies={updateMovies}/>
                {preloaderActive ?
                    <Preloader /> :
                    <MoviesCardList
                        cards={moviesCards}
                        getMoviesIsError={getMoviesIsError}
                        handlerPostSavedCard={handlerPostSavedCard}
                        savedUserCards={savedUserCards}
                    />
                }
            </div>
            <Footer />
        </div>
    )
}