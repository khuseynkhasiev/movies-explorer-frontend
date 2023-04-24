import './Header.css';
export default function Header() {
    return (
        <header className='header'>
            <div className='header__logo'></div>
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li className='header__nav-item'><a className='header__nav-link'>Регистрация</a></li>
                    <li className='header__nav-item'><a className='header__nav-link'><span className='header__signin'>Войти</span></a></li>
                </ul>
            </nav>
        </header>
    )
}