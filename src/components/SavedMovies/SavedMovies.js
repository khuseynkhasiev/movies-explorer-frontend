import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {savedCards} from "../../constants";
import './SavedMovies.css';
import HeaderResult from "../HeaderResult/HeaderResult";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
export default function SavedMovies(props){
    const {
        handlerMenuIsActive,
        handlerButtonLogo,
        handlerButtonSavedMovies,
        handlerButtonMovies,
        handlerButtonProfile,
    } = props;
    return (
        <>
            <HeaderResult
                handlerMenuIsActive={handlerMenuIsActive}
                handlerButtonLogo={handlerButtonLogo}
                handlerButtonSavedMovies={handlerButtonSavedMovies}
                handlerButtonMovies={handlerButtonMovies}
                handlerButtonProfile={handlerButtonProfile}
            />
            <SearchForm />
            <section className='saved-movies'>
                <MoviesCardList cards={savedCards} />
            </section>
            <Footer />
        </>

    )
}