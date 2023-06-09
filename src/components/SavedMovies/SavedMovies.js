import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';
import HeaderResult from "../HeaderResult/HeaderResult";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function SavedMovies(props){
    const {
        handleMenuIsActive,
        handleButtonLogo,
        handleButtonSavedMovies,
        handleButtonMovies,
        handleButtonProfile,
        handleDeleteSavedCard,
        menuIsActive,
        handleGetMovies,
        updateMovies,
        handleIsShortFilms,
        handleFilterSavedUserCards,
    } = props;
    const {savedUserCards} = useContext(CurrentUserContext);

    return (
        <div className='saved-movies'>
            <div className='saved-movies__container'>
                <HeaderResult
                    handleMenuIsActive={handleMenuIsActive}
                    handleButtonLogo={handleButtonLogo}
                    handleButtonSavedMovies={handleButtonSavedMovies}
                    handleButtonMovies={handleButtonMovies}
                    handleButtonProfile={handleButtonProfile}
                    menuIsActive={menuIsActive}
                />
                <SearchForm
                    handleGetMovies={handleGetMovies}
                    updateMovies={updateMovies}
                    handleIsShortFilms={handleIsShortFilms}
                    handleFilterSavedUserCards={handleFilterSavedUserCards}
                />
                <MoviesCardList
                    cards={savedUserCards}
                    handleDeleteSavedCard={handleDeleteSavedCard}
                />
            </div>
            <Footer />
        </div>
    )
}