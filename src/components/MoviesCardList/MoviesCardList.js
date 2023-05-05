import {useState, useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {cards} from "../../constants";

export default function MoviesCardList(){
    const [newCardsList, setNewCardsList] = useState(cards);
    const [windowWidth, setWindowWidth] = useState();

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        if (windowWidth < 1023 & windowWidth > 767) {
            const arr = cards.slice(0,8);
            setNewCardsList(arr)
        }
        else if (windowWidth < 768) {
            const arr = cards.slice(0,5);
            setNewCardsList(arr)
        } else {
            setNewCardsList(cards)
        }
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [windowWidth]);
    function resizeHandler(){
        setWindowWidth(window.innerWidth);
    };
    return (
        <section className='movies-card-list'>
            <div className='movies-card-list__container'>
                <ul className='movies-card-list__elements'>
                    {
                        newCardsList.map((card) => {
                            return <MoviesCard
                                card={card}
                                key={card._id}/>
                        })
                    }
                </ul>
                <button className='movies-card-list__btn'>Ещё</button>
            </div>
        </section>
    )
}