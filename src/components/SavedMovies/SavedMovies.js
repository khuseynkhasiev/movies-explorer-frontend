import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';
import HeaderResult from "../HeaderResult/HeaderResult";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function SavedMovies(props){
    const {
        handlerMenuIsActive,
        handlerButtonLogo,
        handlerButtonSavedMovies,
        handlerButtonMovies,
        handlerButtonProfile,
        handlerDeleteSavedCard,
        menuIsActive,
    } = props;
    const {savedUserCards} = useContext(CurrentUserContext);
    return (
        <div className='saved-movies'>
            <div className='saved-movies__container'>
                <HeaderResult
                    handlerMenuIsActive={handlerMenuIsActive}
                    handlerButtonLogo={handlerButtonLogo}
                    handlerButtonSavedMovies={handlerButtonSavedMovies}
                    handlerButtonMovies={handlerButtonMovies}
                    handlerButtonProfile={handlerButtonProfile}
                    menuIsActive={menuIsActive}
                />
                <SearchForm />
                <MoviesCardList
                    cards={savedUserCards}
                    handlerDeleteSavedCard={handlerDeleteSavedCard}
                />
            </div>
            <Footer />
        </div>
    )
}