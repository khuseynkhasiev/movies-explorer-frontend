import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__container'>
                <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className='footer__info'>
                    <p className='footer__date'> &copy;	2020</p>
                    <ul className='footer__list'>
                        <li className='footer__item'><a className='footer__link' href='#'>Яндекс.Практикум</a></li>
                        <li className='footer__item'><a className='footer__link' href='#'>Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        )
}