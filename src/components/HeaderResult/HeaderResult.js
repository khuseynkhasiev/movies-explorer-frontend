import './HeaderResult.css';
export default function HeaderResult(){
    return (
        <header className='header-result'>
            <div className='header-result__top-line'>
                <div className='header-result__logo'></div>
                <nav className='header-result__nav'>
                    <ul className='header-result__nav-list'>
                        <li className='header-result__nav-item'><a className='header-result__nav-link' href='#'>Фильмы</a></li>
                        <li className='header-result__nav-item'><a className='header-result__nav-link' href='#'>Сохранённые фильмы</a></li>
                    </ul>
                    <a className='header-result__profile-block'>
                        <div className='header-result__profile-icon'></div>
                        <p className='header-result__profile-text'>Аккаунт</p>
                    </a>
                </nav>
                <div className='header-result__menu-icon'></div>
            </div>
        </header>
    )
}