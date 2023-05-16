import './Menu.css';
export default function Menu(props){
    const {
        handleMenuIsActive,
        handleButtonLogo,
        handleButtonSavedMovies,
        handleButtonMovies,
        handleButtonProfile
    } = props;

    function handleClickMain(){
        handleButtonLogo();
        handleMenuIsActive();
    }
    function handleClickMovies(){
        handleButtonMovies();
        handleMenuIsActive();
    }
    function handleClickSavedMovies(){
        handleButtonSavedMovies();
        handleMenuIsActive();
    }
    function handleClickProfile(){
        handleButtonProfile();
        handleMenuIsActive();
    }
    return (
        <div className='menu'>
            <div className='menu__container'>
                <div className='menu__exit-icon' onClick={handleMenuIsActive}></div>
                <nav className='menu__nav'>
                    <ul className='menu__nav-list'>
                        <li className='menu__nav-item'><a className='menu__nav-link' onClick={handleClickMain}>Главная</a></li>
                        <li className='menu__nav-item'><a className='menu__nav-link menu__nav-link_active' onClick={handleClickMovies}>Фильмы</a></li>
                        <li className='menu__nav-item'><a className='menu__nav-link' onClick={handleClickSavedMovies}>Сохранённые фильмы</a></li>
                    </ul>
                    <a className='menu__profile-block' onClick={handleClickProfile}>
                        <div className='menu__profile-icon'></div>
                        <p className='menu__profile-text'>Аккаунт</p>
                    </a>
                </nav>
            </div>
        </div>
    )
}