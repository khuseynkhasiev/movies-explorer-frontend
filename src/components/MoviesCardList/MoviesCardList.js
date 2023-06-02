import {useState, useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props){
    const {
        cards,
        handlerPostSavedCard,
        getMoviesIsError,
        handlerDeleteSavedCard,
    } = props;
    const [newCardsList, setNewCardsList] = useState([])
    const [windowWidth, setWindowWidth] = useState();
    const [isVisibleBtn, setIsVisibleBtn] = useState(false);
    const [numberEndResize1280, setNumberSize1280] = useState(20);
    const [numberEndResize1024, setNumberSize1024] = useState(12);
    const [numberEndResize650, setNumberSize650] = useState(10);
    const [numberEndResize320, setNumberSize320] = useState(6);

    useEffect(() => {
        window.addEventListener('resize', handlerResize);
        handlerResize();
        return () => {
            window.removeEventListener('resize', handlerResize);
        }
    }, [windowWidth, cards]);
    function handleIncrementBtnMovies(){
        if (windowWidth > 1279){
            setNumberSize1280(numberEndResize1280+4);
            setNewCardsList(cards.slice(0,numberEndResize1280))
            handleVisibleBtn(cards.length, numberEndResize1280);
        }
        else if (windowWidth < 1280 & windowWidth > 1023){
            setNumberSize1024(numberEndResize1024+3);
            setNewCardsList(cards.slice(0,numberEndResize1024))
            handleVisibleBtn(cards.length, numberEndResize1024);
        }
        else if (windowWidth < 1024 & windowWidth > 649){
            setNumberSize650(numberEndResize650+2);
            setNewCardsList(cards.slice(0,numberEndResize650))
            handleVisibleBtn(cards.length, numberEndResize650);
        }
        else if (windowWidth < 650 & windowWidth > 319){
            setNumberSize320(numberEndResize320+1);
            setNewCardsList(cards.slice(0,numberEndResize320))
            handleVisibleBtn(cards.length, numberEndResize320);
        }
    }
    function handlerResize(){
        setWindowWidth(window.innerWidth);
        if (windowWidth > 1279 & cards !== null) {
            setNewCardsList(cards.slice(0,16));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 1280 & windowWidth > 1023 & cards !== null) {
            setNewCardsList(cards.slice(0,9));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 1024 & windowWidth > 649 & cards !== null) {
            setNewCardsList(cards.slice(0,8));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 650 & windowWidth > 319 & cards !== null) {
            setNewCardsList(cards.slice(0,5));
            handleVisibleBtn(cards.length, newCardsList.length);
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
                {newCardsList.length === 0 ?
                    (getMoviesIsError ?
                        <p className='movies-card-list__nothing-found-text'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
                        <p className='movies-card-list__nothing-found-text'>Ничего не найдено</p>)
                    :
                    <ul className='movies-card-list__elements'>
                        {
                            newCardsList.map((card) => {
                            return <MoviesCard
                                card={card}
                                key={card.id}
                                handlerPostSavedCard={handlerPostSavedCard}
                                handlerDeleteSavedCard={handlerDeleteSavedCard}
                            />
                            })
                        }
                    </ul>
                }
                {
                    isVisibleBtn && <button className='movies-card-list__btn' onClick={handleIncrementBtnMovies}>Ещё</button>
                }
            </div>
        </section>
    )
}