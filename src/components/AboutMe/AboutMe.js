import './AboutMe.css';
import myPhoto from '../../images/my-photo.png';
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
            </div>
        </section>
    )
}