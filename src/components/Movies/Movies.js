import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";

export default function Movies() {
    return (
        <section className='movies'>
            <HeaderResult />
            <SearchForm />
            <MoviesCardList cards={cards}/>
        </section>
    )
}