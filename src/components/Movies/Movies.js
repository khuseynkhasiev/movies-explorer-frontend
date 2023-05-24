import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";
import Menu from "../Menu/Menu";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";
import Footer from "../Footer/Footer";

export default function Movies(props){
    const {
        preloaderActive,
        messageNothingFound,
        updateMovies,
        handlerSavedCard,
        handlerMenuIsActive,
        handlerButtonLogo,
        handlerButtonSavedMovies,
        handlerButtonMovies,
        handlerButtonProfile,
        handleGetMovies,
        setIsShortFilm,
    } = props;

    const [moviesCards, setMoviesCards] = useState([]);

    useEffect(()=>{
        setMoviesCards(JSON.parse(localStorage.getItem('movies')));
    },[updateMovies]);
    return (
        <>
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
                <section className='movies'>
                    <MoviesCardList
                        cards={moviesCards}
                        messageNothingFound={messageNothingFound}
                        handlerSavedCard={handlerSavedCard}
                    />
                </section>
            }
            <Footer />
        </>
    )
}