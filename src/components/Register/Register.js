import './Register.css';
import {useEffect, useState} from "react";
export default function Register(props){
    const {
        handleButtonSignIn,
        handleButtonLogo,
        handleRegister
    } = props;
/*    const [userDate, setUserDate] = useState({
        name: '',
        email: '',
        password: '',
    });*/
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [emailOnError, setEmailOnError] = useState(false);
    const [passwordOnError, setPasswordOnError] = useState(false);
    const [nameOnError, setNameOnError] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if(email.length===0 || password.length ===0 || name.length===0){
            setFormValid(false);
        }
        else if(emailOnError || passwordOnError || nameOnError){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailOnError, passwordOnError, nameOnError])
    const emailHandler = e => {
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
    const passwordHandler = e => {
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
    const nameHandler = e => {
        setName(e.target.value);
        const reg = /^[a-zа-яё\s\-_]+$/iu;
        if(!e.target.value){
            setNameOnError(true);
        } else if(!reg.test(String(e.target.value).toLowerCase())){
            setNameError('Поле может содержать только латиницу, кириллицу, пробел или дефис');
            setNameOnError(true);
        }
        else {
            setNameOnError(false);
        }
    }
    const blurHandler = e => {
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
            case 'name':
                if(!name){
                    setNameOnError(true);
                }
                break
        }
    }
/*    function handleUserDate(e){
        const {name, value} = e.target;
        setUserDate({...userDate, [name]: value})
    }*/
    function handleSubmitForm(e){
        e.preventDefault();
        handleRegister({email, password, name});
    }
    return (
        <div className='register'>
            <header className='register__header'>
                <div className='register__logo' onClick={handleButtonLogo}></div>
            </header>
            <form className='register__form' onSubmit={handleSubmitForm} noValidate>
                <h3 className="register__title">Добро пожаловать!</h3>
                <p className='register__text'>Имя</p>
                <input
                    onBlur={blurHandler}
                    type="text"
                    className="register__input"
                    id="name"
                    name="name"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={nameHandler}/>
                <span className={`reqister__input-error ${nameOnError && 'reqister__input-error_visible'}`}>{nameError}</span>
                <p className='register__text'>E-mail</p>
                <input
                    onBlur={blurHandler}
                    type="email"
                    className="register__input"
                    id="email"
                    name="email"
                    required
                    minLength='3'
                    maxLength='30'
                    onChange={emailHandler}/>
                <span className={`reqister__input-error ${emailOnError && 'reqister__input-error_visible'}`}>{emailError}</span>
                <p className='register__text'>Пароль</p>
                <input
                    onBlur={blurHandler}
                    type="password"
                    className="register__input"
                    id="password"
                    name="password"
                    required
                    minLength='3'
                    maxLength='29'
                    onChange={passwordHandler}/>
                <span className={`reqister__input-error ${passwordOnError && 'reqister__input-error_visible'}`}>{passwordError}</span>
                <button disabled={!formValid} type="submit" className={`register__submit-btn ${formValid && 'register__submit-btn_active'}`}>Зарегистрироваться</button>
                <p className="register__subtext">
                    Уже зарегистрированы?<span className="register__link" onClick={handleButtonSignIn}>  Войти</span>
                </p>
            </form>
        </div>
    )
}