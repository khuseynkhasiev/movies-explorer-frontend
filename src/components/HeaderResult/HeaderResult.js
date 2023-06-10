import './HeaderResult.css';
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
export default function HeaderResult(props){
    const {
        handleMenuIsActive,
        menuIsActive
    } = props;

    const navigate = useNavigate();
    const handleButtonLogo  = () =>{
        navigate('/')
    }
    const handleButtonMovies = () => {
        navigate('/movies', {replace: true})
    }
    const handleButtonSavedMovies = () => {
        navigate('/saved-movies', {replace: true});
    }
    const handleButtonProfile = () => {
        navigate('/profile', {replace: true})
    }
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
                {menuIsActive && <Menu
                    handleMenuIsActive={handleMenuIsActive}
                />}
            </div>
        </header>
    )
}