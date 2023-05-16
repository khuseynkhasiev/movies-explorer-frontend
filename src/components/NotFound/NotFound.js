import './NotFound.css';
export default function NotFound(props){
    const {
        handleButtonLogo
    } = props;
    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <p className='not-found__error'>404</p>
                <h1 className='not-found__title'>Страница не найдена</h1>
                <p className='not-found__link' onClick={handleButtonLogo}>Назад</p>
            </div>
        </div>
    )
}