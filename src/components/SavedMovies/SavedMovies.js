import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {savedCards} from "../../constants";
import './SavedMovies.css';
export default function SavedMovies(){
    return (
        <section className='saved-movies'>
            <MoviesCardList cards={savedCards} />
        </section>
    )
}