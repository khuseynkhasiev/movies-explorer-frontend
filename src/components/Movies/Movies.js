import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderResult from "../HeaderResult/HeaderResult";
import {cards} from "../../constants";
import Menu from "../Menu/Menu";
import Preloader from "../Preloader/Preloader";

export default function Movies() {
    return (
        <section className='movies'>
            {/*<Menu />*/}
            <MoviesCardList cards={cards}/>
            {/*<Preloader />*/}
        </section>
    )
}