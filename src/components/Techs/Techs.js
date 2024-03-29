import './Techs.css';
export default function Techs() {
    return (
        <section className='techs' id='techs-id'>
            <div className='techs__container'>
                <h2 className='techs__title'>Технологии</h2>
                <h3 className='techs__text'>8 технологий</h3>
                <p className='techs__subtext'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__stack'>
                    <li className='techs__item'>HTML</li>
                    <li className='techs__item'>CSS</li>
                    <li className='techs__item'>JS</li>
                    <li className='techs__item'>React</li>
                    <li className='techs__item'>Git</li>
                    <li className='techs__item'>Node.js</li>
                    <li className='techs__item'>Express.js</li>
                    <li className='techs__item'>mongoDB</li>
                </ul>
            </div>
        </section>
    )
}