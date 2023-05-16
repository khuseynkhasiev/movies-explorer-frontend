import {useState, useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props){
    const {
        cards,
        messageNothingFound,
    } = props;
    const [newCardsList, setNewCardsList] = useState([])
    const [windowWidth, setWindowWidth] = useState();
    const [isVisibleBtn, setIsVisibleBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', handlerResize);
        handlerResize();
        return () => {
            window.removeEventListener('resize', handlerResize);
        }
    }, [windowWidth, cards]);

    function handleIncrementCardsBtn(){
        const incrementMovies = cards.slice(16, 20);
        setNewCardsList([cards.slice(0,16), incrementMovies]);
    }
    function handlerResize(){
        setWindowWidth(window.innerWidth);
        if (windowWidth > 1280) {
            setNewCardsList(cards.slice(0,16));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 1280 & windowWidth > 1023) {
            setNewCardsList(cards.slice(0,9));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 1024 & windowWidth > 480) {
            setNewCardsList(cards.slice(0,8));
            handleVisibleBtn(cards.length, newCardsList.length);
        }
        else if (windowWidth < 768) {
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
                    <p className='movies-card-list__nothing-found-text'>{messageNothingFound}</p>
                    :
                    <ul className='movies-card-list__elements'>
                        {
                            newCardsList.map((card) => {
                            return <MoviesCard
                            card={card}
                            key={card.id}/>
                            })
                        }
                    </ul>
                }
                {
                    isVisibleBtn && <button className='movies-card-list__btn' onClick={handleIncrementCardsBtn}>Ещё</button>
                }
            </div>
        </section>
    )
}