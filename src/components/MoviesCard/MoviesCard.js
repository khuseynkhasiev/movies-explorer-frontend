import './MoviesCard.css';
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {Link} from "react-router-dom";
export default function MoviesCard(props){
    const {
        card,
        handlePostSavedCard,
        handleDeleteSavedCard,
        isCardCloseIcon,
    } = props;
    const {savedUserCards} = useContext(CurrentUserContext);
    const [cardImageUrl, setCardImageUrl] = useState('');
    const [isLikeMovie, setIsLikeMovie] = useState(savedUserCards.some(i => i.id === card.id));
    useEffect(() => {
        setIsLikeMovie(savedUserCards.some(i => i.id === card.id));
    }, [savedUserCards]);
    useEffect(()=> {
        if(typeof card.image === "string"){
            setCardImageUrl(card.image);
        } else {
            setCardImageUrl(`https://api.nomoreparties.co${card.image.url}`);
        }
    }, [card])

    function handleLikeCardBtn(){
        if(isLikeMovie){
            setIsLikeMovie(false);
            handleDeleteSavedCard(card);
        } else {
            const isLiked = savedUserCards.some(i => i.id === card.id);
            setIsLikeMovie(true);
            if(!isLiked){
                handlePostSavedCard(card);
            }
        }
    }
    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <Link className={'movies-card__link'} to={card.trailerLink} target='_blank'>
                    <img className='movies-card__img' src={cardImageUrl} alt={card.nameRU}/>
                </Link>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.nameRU}</p>
                    <button className={`movies-card__btn ${isLikeMovie && 'movies-card__btn_active'} ${isCardCloseIcon && 'movies-card__btn-close'}`} onClick={handleLikeCardBtn} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.duration} м</p>
        </li>
    )
}