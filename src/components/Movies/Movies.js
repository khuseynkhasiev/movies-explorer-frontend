import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";
import Menu from "../Menu/Menu";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";

export default function Movies(props){
    const {
        preloaderActive,
        messageNothingFound,
        updateMovies,
        handleSavedCard
    } = props;

    const [moviesCards, setMoviesCards] = useState([]);

    useEffect(()=>{
        setMoviesCards(JSON.parse(localStorage.getItem('movies')));
    },[updateMovies]);
    console.log(moviesCards);
    return (
        <>
            {preloaderActive ?
                <Preloader /> :
                <section className='movies'>
                    <MoviesCardList
                        cards={moviesCards}
                        messageNothingFound={messageNothingFound}
                        handleSavedCard={handleSavedCard}
                    />
                </section>
            }
        </>
    )
}