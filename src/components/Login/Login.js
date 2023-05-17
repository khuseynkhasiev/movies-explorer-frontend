import {useState} from "react";
import './Login.css';
export default function Login(props){
    const {
        handleButtonRegister,
        handleButtonLogo,
        handleLogin
    } = props;
    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    });

    function handleUserDate(e){
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }
    function handleSubmitForm(e){
        e.preventDefault();
        handleLogin(userDate);
    }
    return (
        <div className='login'>
            <header className='login__header'>
                <div className='login__logo' onClick={handleButtonLogo}></div>
            </header>
            <form className='login__form' onSubmit={handleSubmitForm}>
                <h3 className="login__title">Рады видеть!</h3>
                <p className='login__text'>E-mail</p>
                <input
                    type="email"
                    className="login__input"
                    id="email"
                    name="email"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={handleUserDate}/>
                <span className='login__input-error'>Что-то пошло не так...</span>
                <p className='login__text'>Пароль</p>
                <input
                    type="password"
                    className="login__input"
                    id="password"
                    name="password"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={handleUserDate}/>
                <span className='login__input-error'>Что-то пошло не так...</span>
                <button type="submit" className="login__submit-btn">Войти</button>
                <p className="login__subtext">
                    Ещё не зарегистрированы?<span className="login__link" onClick={handleButtonRegister}> Регистрация</span>
                </p>
            </form>
        </div>
    )
}