import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";
import Menu from "../Menu/Menu";

export default function Movies() {
    return (
        <section className='movies'>
            <HeaderResult />
            <SearchForm />
            <Menu />
            <MoviesCardList cards={cards}/>
        </section>
    )
}