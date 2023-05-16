import './MoviesCard.css';

export default function MoviesCard({card}){
    const cardLikeButtonClassName = (
        `movies-card__btn ${card.isLike && 'movies-card__btn_active'}`
    );
    return (
        <li className='movies-card'>

            <div className='movies-card__info'>
                <img className='movies-card__img' src={card.image} alt={card.name}/>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.name}</p>
                    <button className={cardLikeButtonClassName} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.time}</p>
        </li>
    )
}