import './Profile.css';
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import HeaderResult from "../HeaderResult/HeaderResult";
import Menu from  "../Menu/Menu";
export default function Profile(props){
    const {
        handlerUserExit,
        handlerMenuIsActive,
        handlerButtonLogo,
        handlerButtonSavedMovies,
        handlerButtonMovies,
        handlerButtonProfile,
        menuIsActive,
        handlerPatchUser,
        patchUserIsError
    } = props;
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [onEditForm, setOnEditForm] = useState(false);
    const [emailOnError, setEmailOnError] = useState(false);
    const [nameOnError, setNameOnError] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [formValid, setFormValid] = useState(false);
    const [titleName, setTitleName] = useState(currentUser.name);

    useEffect(() => {
        if(email.length===0 || name.length===0){
            setFormValid(false);
        }
        else if(emailOnError || nameOnError){
            setFormValid(false);
        } else if(name === currentUser.name && email === currentUser.email){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailOnError, nameOnError, name, email])

    const emailHandler = (e) => {
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
    const nameHandler = (e) => {
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
            case 'name':
                if(!name){
                    setNameOnError(true);
                }
                break
        }
    }
    const handlerOnEditForm = () => {
        setOnEditForm(true);
    }
    const handlerOffEditForm = (e) => {
        e.preventDefault();
        handlerPatchUser({email, name})
        setOnEditForm(false);
        setTitleName(name);
    }

    return (
        <>
            <HeaderResult
                handlerMenuIsActive={handlerMenuIsActive}
                handlerButtonLogo={handlerButtonLogo}
                handlerButtonSavedMovies={handlerButtonSavedMovies}
                handlerButtonMovies={handlerButtonMovies}
                handlerButtonProfile={handlerButtonProfile}
            />
            {menuIsActive && <Menu
                handlerMenuIsActive={handlerMenuIsActive}
                handlerButtonLogo={handlerButtonLogo}
                handlerButtonSavedMovies={handlerButtonSavedMovies}
                handlerButtonMovies={handlerButtonMovies}
                handlerButtonProfile={handlerButtonProfile}
            />}
            <div className='profile'>
                <form className='profile__form'>
                    <h3 className='profile__title'>Привет, {titleName}!</h3>
                    <div className='profile__block'>
                        <label className='profile__text' htmlFor='profile-name'>Имя</label>
                        <input
                            onChange={nameHandler}
                            onBlur={blurHandler}
                            className='profile__input'
                            name='profile-name'
                            value={name}
                            type='text'
                            id='profile-name'
                            disabled={!onEditForm}
                            placeholder='Имя'
                            required
                        >
                        </input>
                    </div>
{/*
                    <span className={`profile__input-error ${nameOnError && 'profile__input-error_visible'}`}>{nameError}</span>
*/}
                    <div className='profile__line'></div>
                    <div className='profile__block'>
                        <label className='profile__text' htmlFor='profile-email'>E-mail</label>
                        <input
                            onChange={emailHandler}
                            onBlur={blurHandler}
                            className='profile__input'
                            name='profile-email'
                            value={email}
                            type='email'
                            id='profile-email'
                            disabled={!onEditForm}
                            placeholder='E-mail'
                            required
                        >
                        </input>
                    </div>
{/*
                    <span className={`profile__input-error ${emailOnError && 'profile__input-error_visible'}`}>{emailError}</span>
*/}
                    {onEditForm ? (
                        <>
                            <span
                                className={`profile__input-error ${nameOnError && 'profile__input-error_visible'}`}>
                                {nameError}
                            </span>
                            <span
                                className={`profile__input-error ${emailOnError && 'profile__input-error_visible'}`}>
                                {emailError}
                            </span>
                            <button
                                className={`profile__submit-btn ${formValid && 'profile__submit-btn_active'}`}
                                type='submit'
                                onClick={handlerOffEditForm}
                                disabled={!formValid}>
                                Сохранить
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handlerOnEditForm}
                                type='button'
                                name='profile__edit-btn'
                                className='profile__edit-btn'>
                                Редактировать
                            </button>
                            <button
                                onClick={handlerUserExit}
                                type='button'
                                name='profile__exit-btn'
                                className='profile__exit-btn'>
                                Выйти из аккаунта
                            </button>
                        </>
                    ) }
                    </form>
            </div>
        </>
    )
}