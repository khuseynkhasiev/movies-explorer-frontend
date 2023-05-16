import portfolioArrow from "../../images/portfolio-arrow.svg";
import "./Portfolio.css";

export default function Portfolio(){
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
                <h3 className='portfolio__title'>Портфолио</h3>
                <ul className='portfolio__list'>
                    <li className='portfolio__item'><a className='portfolio__link' href='https://github.com/khuseynkhasiev/how-to-learn' target='_blank'>Статичный сайт</a><a className='portfolio__link-arrow' href='https://github.com/khuseynkhasiev/how-to-learn' target='_blank'><img className='portfolio__arrow' src={portfolioArrow}></img></a></li>
                    <li className='portfolio__item'><a className='portfolio__link' href='https://khuseynkhasiev.github.io/russian-travel/' target='_blank'>Адаптивный сайт</a><a className='portfolio__link-arrow' href='https://khuseynkhasiev.github.io/russian-travel/' target='_blank'><img className='portfolio__arrow' src={portfolioArrow}></img></a></li>
                    <li className='portfolio__item'><a className='portfolio__link' href='https://mestogram.nomoredomains.monster/' target='_blank'>Одностраничное приложение</a><a className='portfolio__link-arrow' href='https://mestogram.nomoredomains.monster/' target='_blank'><img className='portfolio__arrow' src={portfolioArrow}></img></a></li>
                </ul>
            </div>
        </section>
    )
}