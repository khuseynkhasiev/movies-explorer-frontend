import './MoviesCard.css';

export default function MoviesCard(props){
    const {
        card,
        handleSavedCard
    } = props;

    function handleLikeCardBtn(){
        handleSavedCard(card);
    }

    const cardLikeButtonClassName = (
        `movies-card__btn ${card.isLike && 'movies-card__btn_active'}`
    );
    return (
        <li className='movies-card'>
            <div className='movies-card__info'>
                <img className='movies-card__img' src={`https://api.nomoreparties.co/${card.image.url}`} alt={card.nameRU}/>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.nameRU}</p>
                    <button className={cardLikeButtonClassName} onClick={handleLikeCardBtn} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.duration} м</p>
        </li>
    )
}