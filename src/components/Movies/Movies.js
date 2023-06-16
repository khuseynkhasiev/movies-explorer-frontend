import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import './Movies.css';

export default function Movies(props){
    const {
        preloaderActive,
        updateMovies,
        handlePostSavedCard,
        handleMenuIsActive,
        handleGetMovies,
        getMoviesIsError,
        handleDeleteSavedCard,
        handleIsShortFilms,
        menuIsActive,
        handleFilterSavedUserCards
    } = props;

    const [moviesCards, setMoviesCards] = useState([]);
    useEffect(()=>{
        setMoviesCards(JSON.parse(localStorage.getItem('movies')));
    },[updateMovies]);

    return (
        <div className='movies'>
            <div className='movies__container'>
                <HeaderResult
                    handleMenuIsActive={handleMenuIsActive}
                    menuIsActive={menuIsActive}
                    handleFilterSavedUserCards={handleFilterSavedUserCards}
                />
                <SearchForm
                    handleGetMovies={handleGetMovies}
                    updateMovies={updateMovies}
                    handleIsShortFilms={handleIsShortFilms}
                />
                {preloaderActive ?
                    <Preloader /> :
                    <MoviesCardList
                        cards={moviesCards}
                        handleDeleteSavedCard={handleDeleteSavedCard}
                        getMoviesIsError={getMoviesIsError}
                        handlePostSavedCard={handlePostSavedCard}
                    />
                }
            </div>
            <Footer />
        </div>
    )
}