import './NavTab.css';
export default function NavTab(){
    return (
        <nav className='navtab'>
            <ul className='navtab__list'>
                <li className='navtab__item'><a className='navtab__link' href='#about-project-id'>О проекте</a></li>
                <li className='navtab__item'><a className='navtab__link' href='#techs-id'>Технологии</a></li>
                <li className='navtab__item'><a className='navtab__link' href='#about-me-id'>Студент</a></li>
            </ul>
        </nav>
    )
}