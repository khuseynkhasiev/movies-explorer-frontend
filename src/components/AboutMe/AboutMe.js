import './AboutMe.css';
import myPhoto from '../../images/my-photo.png';
import aboutMeArrow from '../../images/about-me-arrow.svg'
export default function AboutMe() {
    return (
        <section className='about-me'>
            <div className='about-me__container'>
                <h2 className='about-me__title'>Студент</h2>
                <div className='about-me__biography'>
                    <div className='about-me__info'>
                        <h3 className='about-me__name'>Виталий</h3>
                        <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
                        <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <a className='about-me__subtext' href='https://github.com/khuseynkhasiev' target='_blank'>Github</a>
                    </div>
                    <img className='about-me__img' src={myPhoto} alt='my-photo' />
                </div>
                <h3 className='about-me__portfolio'>Портфолио</h3>
                <ul className='about-me__list'>
                    <li className='about-me__item'><a className='about-me__link' href='#'>Статичный сайт</a><img className='about-me__arrow' src={aboutMeArrow}></img></li>
                    <li className='about-me__item'><a className='about-me__link' href='#'>Адаптивный сайт</a><img className='about-me__arrow' src={aboutMeArrow}></img></li>
                    <li className='about-me__item'><a className='about-me__link' href='#'>Одностраничное приложение</a><img className='about-me__arrow' src={aboutMeArrow}></img></li>
                </ul>
            </div>
        </section>
    )
}