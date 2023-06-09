import {useEffect, useState} from "react";
import './Login.css';
export default function Login(props){
    const {
        handleButtonRegister,
        handleButtonLogo,
        handleLogin
    } = props;
/*    const [userDate, setUserDate] = useState({
        email: '',
        password: '',
    });*/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailOnError, setEmailOnError] = useState(false);
    const [passwordOnError, setPasswordOnError] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

/*    function handleUserDate(e){
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }*/
    useEffect(() => {
        if(email.length===0 || password.length ===0){
            setFormValid(false);
        }
        else if(emailOnError || passwordOnError){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailOnError, passwordOnError])
    const emailhandle = e => {
        setEmail(e.target.value);
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!e.target.value){
            setEmailError('Email не может быть пустым');
            setEmailOnError(true);
        }
        else if(!reg.test(String(e.target.value).toLowerCase())){
            setEmailError('Email некорректный');
            setEmailOnError(true);
        } else {
            setEmailOnError(false);
        }
    }
    const passwordhandle = e => {
        setPassword(e.target.value);
        if (e.target.value.length < 3){
            setPasswordOnError(true);
            setPasswordError('Пароль должен быть длиннее 3 символов и меньше 30');
            if(!e.target.value) {
                setPasswordError('Пароль не может быть пустым');
            }
        } else {
            setPasswordOnError(false);
        }
    }
    const blurhandle = e => {
        switch (e.target.name){
            case 'email':
                if(!email){
                    setEmailOnError(true);
                }
                break
            case 'password':
                if(!password) {
                    setPasswordOnError(true);
                }
                break
        }
    }
    function handleSubmitForm(e){
        e.preventDefault();
        handleLogin({email, password});
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
                    onBlur={blurhandle}
                    type="email"
                    className="login__input"
                    id="email"
                    name="email"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={emailhandle}/>
                <span className={`reqister__input-error ${emailOnError && 'login__input-error_visible'}`}>{emailError}</span>
                <p className='login__text'>Пароль</p>
                <input
                    onBlur={blurhandle}
                    type="password"
                    className="login__input"
                    id="password"
                    name="password"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={passwordhandle}/>
                <span className={`reqister__input-error ${passwordOnError && 'login__input-error_visible'}`}>{passwordError}</span>
                <button disabled={!formValid} type="submit" className={`login__submit-btn ${formValid && 'login__submit-btn_active'}`}>Войти</button>
                <p className="login__subtext">
                    Ещё не зарегистрированы?<span className="login__link" onClick={handleButtonRegister}> Регистрация</span>
                </p>
            </form>
        </div>
    )
}