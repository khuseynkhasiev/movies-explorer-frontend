import './MoviesCard.css';

export default function MoviesCard(card){
    const {
        name,
        image,
        time,
        isLike,
    } = card;

    const cardLikeButtonClassName = (
        `movies-card__btn ${card.card.isLike && 'movies-card__btn_active'}`
    );

    return (
/*        <li className='movies-card'>
            <img className='movies-card__img' src={card.card.image} alt='card1'/>
            <div className='movies-card__info'>
                <p className='movies-card__text'>{card.card.name}</p>
                <button className={cardLikeButtonClassName} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
            </div>
            <p className='movies-card__time'>{card.card.time}</p>
        </li>*/
        <li className='movies-card'>

            <div className='movies-card__info'>
                <img className='movies-card__img' src={card.card.image} alt='card1'/>
                <div className='movies-card__info-line'>
                    <p className='movies-card__text'>{card.card.name}</p>
                    <button className={cardLikeButtonClassName} type="button" aria-label="кнопка выставления лайка или отмены лайка"></button>
                </div>
            </div>
            <p className='movies-card__time'>{card.card.time}</p>
        </li>
    )
}