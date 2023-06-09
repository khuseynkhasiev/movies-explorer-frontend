import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';
import HeaderResult from "../HeaderResult/HeaderResult";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {useState, useContext, useEffect} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function SavedMovies(props){
    const {
        handleMenuIsActive,
        handleDeleteSavedCard,
        menuIsActive,
        handleGetMovies,
        updateMovies,
        handleIsShortFilms,
        handleFilterSavedUserCards,
    } = props;
    // const {savedUserCards} = useContext(CurrentUserContext);
    const {savedUserCardsFilter} = useContext(CurrentUserContext);

    return (
        <div className='saved-movies'>
            <div className='saved-movies__container'>
                <HeaderResult
                    handleMenuIsActive={handleMenuIsActive}
                    menuIsActive={menuIsActive}
                    handleFilterSavedUserCards={handleFilterSavedUserCards}
                />
                <SearchForm
                    handleGetMovies={handleGetMovies}
                    updateMovies={updateMovies}
                    handleIsShortFilms={handleIsShortFilms}
                    handleFilterSavedUserCards={handleFilterSavedUserCards}
                />
                <MoviesCardList
                    cards={savedUserCardsFilter}
                    handleDeleteSavedCard={handleDeleteSavedCard}
                />
            </div>
            <Footer />
        </div>
    )
}