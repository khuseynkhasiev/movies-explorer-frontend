import './NotFound.css';
import {useNavigate} from "react-router-dom";
import {NotFoundErrorCode} from "../../constants";
export default function NotFound(){
    const navigate = useNavigate();
    const handleBackToPage = () => {
        navigate('/');
    }
    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <p className='not-found__error'>{NotFoundErrorCode}</p>
                <h1 className='not-found__title'>Страница не найдена</h1>
                <p className='not-found__link' onClick={handleBackToPage}>Назад</p>
            </div>
        </div>
    )
}