import './NavTab.css';
export default function NavTab(){
    return (
        <nav className='navtab'>
            <ul className='navtab__list'>
                <li className='navtab__item'><a className='navtab__link'>О проекте</a></li>
                <li className='navtab__item'><a className='navtab__link'>Технологии</a></li>
                <li className='navtab__item'><a className='navtab__link'>Студент</a></li>
            </ul>
        </nav>
    )
}