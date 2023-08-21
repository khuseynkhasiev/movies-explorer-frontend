import './AboutMe.css';
import myPhoto from '../../images/my-photo.jpg';
export default function AboutMe() {
    return (
        <section className='about-me' id='about-me-id'>
            <div className='about-me__container'>
                <h2 className='about-me__title'>Студент</h2>
                <div className='about-me__biography'>
                    <div className='about-me__info'>
                        <h3 className='about-me__name'>Хусейн</h3>
                        <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
                        <p className='about-me__text'>Специалист по информационным технологиям в образовании. Закончил курсы по "Веб-разработке". После чего ушел с основной работы и начал участвовать в различных проектах.  Увлекаюсь спортивными и настольными играми.</p>
                        <a className='about-me__subtext' href='https://github.com/khuseynkhasiev' target='_blank'>Github</a>
                    </div>
                    <img className='about-me__img' src={myPhoto} alt='my-photo' />
                </div>
            </div>
        </section>
    )
}