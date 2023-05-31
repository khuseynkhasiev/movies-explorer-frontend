import './MoviesCard.css';
import {useEffect, useState} from "react";
export default function MoviesCard(props){
    const {
        card,
        savedUserCards,
        handlerPostSavedCard,
    } = props;
    const [cardImageUrl, setCardImageUrl] = useState('');

    useEffect(()=> {
        if(typeof card.image === "string"){

            setCardImageUrl(card.image);
        } else {
            setCardImageUrl(`https://api.nomoreparties.co${card.image.url}`);
        }
    }, [card])
    function handleLikeCardBtn(){
/*        card.isLike = 'true';
        console.log(card);*/
        handlerPostSavedCard(card);
    }
    const cardLikeButtonClassName = (
        `movies-card__btn ${card.isLike && 'movies-card__btn_active'}`
    );
    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <img className='movies-card__img' src={cardImageUrl} alt={card.nameRU}/>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.nameRU}</p>
                    <button className={cardLikeButtonClassName} onClick={handleLikeCardBtn} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.duration} м</p>
        </li>
    )
}