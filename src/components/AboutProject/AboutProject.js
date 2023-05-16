import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className='about-project' id='about-project-id'>
            <div className='about-project__container'>
                <h2 className='about-project__title'>О проекте</h2>
                <div className='about-project__info-container'>
                    <div className='about-project__info'>
                        <h3 className='about-project__info-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__info'>
                        <h3 className='about-project__info-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__time'>
                    <p className='about-project__back-end'>1 неделя</p>
                    <p className='about-project__front-end'>4 недели</p>
                    <p className='about-project__subtitle'>Back-end</p>
                    <p className='about-project__subtitle'>Front-end</p>
                </div>
            </div>
        </section>
    )
}