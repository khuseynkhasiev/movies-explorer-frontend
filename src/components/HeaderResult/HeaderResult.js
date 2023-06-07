import './HeaderResult.css';
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
export default function HeaderResult(props){
    const {
        handlerMenuIsActive,
        menuIsActive
    } = props;

    const navigate = useNavigate();
    const handlerButtonLogo  = () =>{
        navigate('/')
    }
    const handlerButtonMovies = () => {
        navigate('/movies')
    }
    const handlerButtonSavedMovies = () => {
        navigate('/saved-movies');
    }
    const handlerButtonProfile = () => {
        navigate('/profile')
    }
    return (
        <header className='header-result'>
            <div className='header-result__top-line'>
                <div className='header-result__logo' onClick={handlerButtonLogo}></div>
                <nav className='header-result__nav'>
                    <ul className='header-result__nav-list'>
                        <li className='header-result__nav-item' onClick={handlerButtonMovies}><a className='header-result__nav-link' href='#'>Фильмы</a></li>
                        <li className='header-result__nav-item' onClick={handlerButtonSavedMovies}><a className='header-result__nav-link' href='#'>Сохранённые фильмы</a></li>
                    </ul>
                    <a className='header-result__profile-block' onClick={handlerButtonProfile}>
                        <div className='header-result__profile-icon'></div>
                        <p className='header-result__profile-text'>Аккаунт</p>
                    </a>
                </nav>
                <div className='header-result__menu-icon' onClick={handlerMenuIsActive}></div>
                {menuIsActive && <Menu
                    handleMenuIsActive={handlerMenuIsActive}
                />}
            </div>
        </header>
    )
}