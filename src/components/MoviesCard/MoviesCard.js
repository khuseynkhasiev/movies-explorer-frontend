import './MoviesCard.css';
import {useContext, useEffect, useState} from "react";
import * as mainApi from "../../utils/MainApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function MoviesCard(props){
    const {
        card,
        handlerPostSavedCard,
        handlerDeleteSavedCard,
    } = props;
    const {savedUserCards} = useContext(CurrentUserContext);
    const [cardImageUrl, setCardImageUrl] = useState('');
    const [isLikeMovie, setIsLikeMovie] = useState(false);
    useEffect(()=> {



        if(typeof card.image === "string"){
            setCardImageUrl(card.image);
        } else {
            setCardImageUrl(`https://api.nomoreparties.co${card.image.url}`);
        }

        const isLiked = savedUserCards.some(i => i.id === card.id);
        if(isLiked){
            setIsLikeMovie(true);
        } else {
            setIsLikeMovie(false);
        }
    }, [card])


    function handleLikeCardBtn(){
        if(isLikeMovie){
            setIsLikeMovie(false);
            handlerDeleteSavedCard(card);
        } else {
            const isLiked = savedUserCards.some(i => i.id === card.id);
            setIsLikeMovie(true);
            if(!isLiked){
                handlerPostSavedCard(card);
            }
        }
    }
    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <img className='movies-card__img' src={cardImageUrl} alt={card.nameRU}/>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.nameRU}</p>
                    <button className={`movies-card__btn ${isLikeMovie && 'movies-card__btn_active'}`} onClick={handleLikeCardBtn} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.duration} м</p>
        </li>
    )
}