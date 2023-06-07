import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import Menu from "../Menu/Menu";
import Preloader from "../Preloader/Preloader";
import {useContext, useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import './Movies.css';
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
        handleGetMovies, //поиск по всем фильмам
        getMoviesIsError,
        cards,
        handlerDeleteSavedCard,
        handlerIsShortFilms,
        menuIsActive,
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
                    handlerButtonProfile={handlerButtonProfile}
                    menuIsActive={menuIsActive}
                />
                <SearchForm
                    handleGetMovies={handleGetMovies}
                    updateMovies={updateMovies}
                    handlerIsShortFilms={handlerIsShortFilms}
                />
                {preloaderActive ?
                    <Preloader /> :
                    <MoviesCardList
                        cards={moviesCards}
                        /*cards={cards}*/
                        handlerDeleteSavedCard={handlerDeleteSavedCard}

                        getMoviesIsError={getMoviesIsError}
                        handlerPostSavedCard={handlerPostSavedCard}
                    />
                }
            </div>
            <Footer />
        </div>
    )
}