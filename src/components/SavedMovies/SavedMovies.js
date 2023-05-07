import HeaderResult from "../HeaderResult/HeaderResult";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {savedCards} from "../../constants";

export default function SavedMovies(){
    return (
        <section className='saved-movies'>
            <HeaderResult />
            <SearchForm />
            <MoviesCardList cards={savedCards} />
        </section>
    )
}