import {useState, useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";
import {
    IncreaseFilmsFour,
    IncreaseFilmsOne,
    IncreaseFilmsThree,
    IncreaseFilmsTwo,
    LaptopScreenSize,
    PcScreenSize, PhoneScreenSize, TapletScreenSize
} from "../../constants";

export default function MoviesCardList(props){
    const {
        cards,
        handlePostSavedCard,
        getMoviesIsError,
        handleDeleteSavedCard,
    } = props;
    const [newCardsList, setNewCardsList] = useState([])
    const [windowWidth, setWindowWidth] = useState();
    const [isVisibleBtn, setIsVisibleBtn] = useState(false);
    const [numberEndResize1280, setNumberSize1280] = useState(20);
    const [numberEndResize1024, setNumberSize1024] = useState(12);
    const [numberEndResize650, setNumberSize650] = useState(10);
    const [numberEndResize320, setNumberSize320] = useState(6);

    const { pathname } = useLocation();
    const isSavedMoviesPage = pathname === '/saved-movies';

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowWidth, cards]);
    function handleIncrementBtnMovies(){
        if (windowWidth >= PcScreenSize){
            setNumberSize1280(numberEndResize1280+IncreaseFilmsFour);
            setNewCardsList(cards.slice(0,numberEndResize1280))
            handleVisibleBtn(cards.length, numberEndResize1280);
        }
        else if (windowWidth < PcScreenSize & windowWidth >= LaptopScreenSize){
            setNumberSize1024(numberEndResize1024+IncreaseFilmsThree);
            setNewCardsList(cards.slice(0,numberEndResize1024))
            handleVisibleBtn(cards.length, numberEndResize1024);
        }
        else if (windowWidth < LaptopScreenSize & windowWidth >= TapletScreenSize){
            setNumberSize650(numberEndResize650+IncreaseFilmsTwo);
            setNewCardsList(cards.slice(0,numberEndResize650))
            handleVisibleBtn(cards.length, numberEndResize650);
        }
        else if (windowWidth < TapletScreenSize & windowWidth >= PhoneScreenSize){
            setNumberSize320(numberEndResize320+IncreaseFilmsOne);
            setNewCardsList(cards.slice(0,numberEndResize320))
            handleVisibleBtn(cards.length, numberEndResize320);
        }
    }
    function handleResize(){
        setWindowWidth(window.innerWidth);
        if (windowWidth >= PcScreenSize & cards !== null) {
            setNewCardsList(cards.slice(0,16));
            handleVisibleBtn(cards.length, cards.slice(0,16).length);
        }
        else if (windowWidth < PcScreenSize & windowWidth >= LaptopScreenSize & cards !== null) {
            setNewCardsList(cards.slice(0,9));
            handleVisibleBtn(cards.length, cards.slice(0,9).length);
        }
        else if (windowWidth < LaptopScreenSize & windowWidth >= TapletScreenSize & cards !== null) {
            setNewCardsList(cards.slice(0,8));
            handleVisibleBtn(cards.length, cards.slice(0,8).length);
        }
        else if (windowWidth < TapletScreenSize & windowWidth >= PhoneScreenSize & cards !== null) {
            setNewCardsList(cards.slice(0,5));
            handleVisibleBtn(cards.length, cards.slice(0,5).length);
        }
    }
    function handleVisibleBtn(cardsLength, newCardsListLength){
        if (cardsLength <= newCardsListLength) {
            setIsVisibleBtn(false);
        } else {
            setIsVisibleBtn(true);
        }
    }

    return (
        <section className='movies-card-list'>
            <div className='movies-card-list__container'>
                {!newCardsList && <p className='movies-card-list__nothing-found-text'>Ничего не найдено</p>}
                {getMoviesIsError ?
                    (<p className='movies-card-list__nothing-found-text'>
                        Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                    </p>)
                    :
                    (<ul className='movies-card-list__elements'>
                        {
                            newCardsList.map((card) => {
                                return <MoviesCard
                                    card={card}
                                    key={card.id}
                                    handlePostSavedCard={handlePostSavedCard}
                                    handleDeleteSavedCard={handleDeleteSavedCard}
                                    isCardCloseIcon={isSavedMoviesPage}
                                />
                            })
                        }
                    </ul>)
                }
                {
                    !isSavedMoviesPage
                        &&
                    (isVisibleBtn && !getMoviesIsError && <button className='movies-card-list__btn' onClick={handleIncrementBtnMovies}>Ещё</button>)
                }
            </div>
        </section>
    )
}