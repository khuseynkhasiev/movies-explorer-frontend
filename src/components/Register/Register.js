import './Register.css';
import {useState} from "react";
export default function Register(props){
    const {
        handleButtonSignIn,
        handleButtonLogo
    } = props;
    const [userDate, setUserDate] = useState({
        name: '',
        email: '',
        password: '',
    });
    function handleUserDate(e){
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }
    function handleSubmitForm(e){
        e.preventDefault();
    }
    return (
        <div className='register'>
            <header className='register__header'>
                <div className='register__logo' onClick={handleButtonLogo}></div>
            </header>
            <form className='register__form' onSubmit={handleSubmitForm}>
                <h3 className="register__title">Добро пожаловать!</h3>
                <p className='register__text'>Имя</p>
                <input
                    type="text"
                    className="register__input"
                    id="name"
                    name="name"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={handleUserDate}/>
                <span className='reqister__input-error'>Что-то пошло не так...</span>
                <p className='register__text'>E-mail</p>
                <input
                    type="email"
                    className="register__input"
                    id="email"
                    name="email"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={handleUserDate}/>
                <span className='reqister__input-error'>Что-то пошло не так...</span>
                <p className='register__text'>Пароль</p>
                <input
                    type="password"
                    className="register__input"
                    id="password"
                    name="password"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={handleUserDate}/>
                <span className='reqister__input-error'>Что-то пошло не так...</span>
                <button type="submit" className="register__submit-btn">Зарегистрироваться</button>
                <p className="register__subtext">
                    Уже зарегистрированы?<span className="register__link" onClick={handleButtonSignIn}>  Войти</span>
                </p>
            </form>
        </div>
    )
}