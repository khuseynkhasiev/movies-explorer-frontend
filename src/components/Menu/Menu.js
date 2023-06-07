import './Menu.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
export default function Menu(props){
    const {
        handleMenuIsActive,
    } = props;
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isMovieActive, setIsMovieActive] = useState(false);
    const [isSaveMoviesActive, setIsSaveMoviesActive] = useState(false);
    console.log(pathname);
    useEffect(() => {
        switch (pathname) {
            case '/':
                setIsMenuActive(true);
                break;
            case '/movies':
                setIsMovieActive(true)
                break;
            case '/saved-movies':
                setIsSaveMoviesActive(true)
                break;
            default:
                break;
        }
    }, [pathname])


    function handleClickMain(){
        navigate('/');
        handleMenuIsActive();
    }
    function handleClickMovies(){
        navigate('/movies');
        handleMenuIsActive();
    }
    function handleClickSavedMovies(){
        navigate('/saved-movies');
        handleMenuIsActive();
    }
    function handleClickProfile(){
        navigate('/profile');
        handleMenuIsActive();
    }
    return (
        <div className='menu'>
            <div className='menu__container'>
                <div className='menu__exit-icon' onClick={handleMenuIsActive}></div>
                <nav className='menu__nav'>
                    <ul className='menu__nav-list'>
                        <li className='menu__nav-item'><a className={`menu__nav-link ${isMenuActive && 'menu__nav-link_active'}`} onClick={handleClickMain}>Главная</a></li>
                        <li className='menu__nav-item'><a className={`menu__nav-link ${isMovieActive && 'menu__nav-link_active'}`} onClick={handleClickMovies}>Фильмы</a></li>
                        <li className='menu__nav-item'><a className={`menu__nav-link ${isSaveMoviesActive && 'menu__nav-link_active'}`} onClick={handleClickSavedMovies}>Сохранённые фильмы</a></li>
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