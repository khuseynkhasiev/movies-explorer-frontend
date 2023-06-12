import './NotFound.css';
import {useNavigate} from "react-router-dom";
export default function NotFound(props){
    const {
        handleUserExit
    } = props;
    const navigate = useNavigate();
    const handleBackToPage = () => {
        navigate('/');
        handleUserExit();
    }
    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <p className='not-found__error'>404</p>
                <h1 className='not-found__title'>Страница не найдена</h1>
                <p className='not-found__link' onClick={handleBackToPage}>Назад</p>
            </div>
        </div>
    )
}