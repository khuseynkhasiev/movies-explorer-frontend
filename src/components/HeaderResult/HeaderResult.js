import './HeaderResult.css';
export default function HeaderResult(props){
    const {
        handleButtonSavedMovies,
        handleButtonMovies,
        handleButtonProfile,
        handleButtonLogo,
        handleMenuIsActive
    } = props;
    return (
        <header className='header-result'>
            <div className='header-result__top-line'>
                <div className='header-result__logo' onClick={handleButtonLogo}></div>
                <nav className='header-result__nav'>
                    <ul className='header-result__nav-list'>
                        <li className='header-result__nav-item' onClick={handleButtonMovies}><a className='header-result__nav-link' href='#'>Фильмы</a></li>
                        <li className='header-result__nav-item' onClick={handleButtonSavedMovies}><a className='header-result__nav-link' href='#'>Сохранённые фильмы</a></li>
                    </ul>
                    <a className='header-result__profile-block' onClick={handleButtonProfile}>
                        <div className='header-result__profile-icon'></div>
                        <p className='header-result__profile-text'>Аккаунт</p>
                    </a>
                </nav>
                <div className='header-result__menu-icon' onClick={handleMenuIsActive}></div>
            </div>
        </header>
    )
}