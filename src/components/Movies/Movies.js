import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeaderResult from "../HeaderResult/HeaderResult";

export default function Movies() {
    return (
        <section className='movies'>
            <HeaderResult />
            <SearchForm />
            <MoviesCardList />
        </section>
    )
}