import portfolioArrow from "../../images/portfolio-arrow.svg";
import "./Portfolio.css";

export default function Portfolio(){
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
                <h3 className='portfolio__title'>Портфолио</h3>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'><a className='portfolio__link' href='#'>Статичный сайт</a><img className='portfolio__arrow' src={portfolioArrow}></img></li>
                    <li className='portfolio__item'><a className='portfolio__link' href='#'>Адаптивный сайт</a><img className='portfolio__arrow' src={portfolioArrow}></img></li>
                    <li className='portfolio__item'><a className='portfolio__link' href='#'>Одностраничное приложение</a><img className='portfolio__arrow' src={portfolioArrow}></img></li>
                </ul>
            </div>
        </section>
    )
}