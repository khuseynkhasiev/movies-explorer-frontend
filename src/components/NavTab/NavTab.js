import './NavTab.css';
export default function NavTab(){
    return (
        <nav className='navtab'>
            <ul className='navtab__list'>
                <li className='navtab__item'><a className='navtab__link' href='#'>О проекте</a></li>
                <li className='navtab__item'><a className='navtab__link' href='#'>Технологии</a></li>
                <li className='navtab__item'><a className='navtab__link' href='#'>Студент</a></li>
            </ul>
        </nav>
    )
}