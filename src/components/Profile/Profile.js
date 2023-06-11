import './Profile.css';
import {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import HeaderResult from "../HeaderResult/HeaderResult";
import Menu from  "../Menu/Menu";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
export default function Profile(props){
    const {
        handleUserExit,
        handleMenuIsActive,
        handleButtonLogo,
        handleButtonSavedMovies,
        handleButtonMovies,
        handleButtonProfile,
        menuIsActive,
        handlePatchUser,
        onClose,
        infoToolTip,
        patchUserIsError,
    } = props;
    const user = JSON.parse(localStorage.getItem('userInfo')) || {};
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [onEditForm, setOnEditForm] = useState(false);
    const [emailOnError, setEmailOnError] = useState(false);
    const [nameOnError, setNameOnError] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if(email.length === 0 || name.length === 0){
            setFormValid(false);
        }
        else if(emailOnError || nameOnError){
            setFormValid(false);
        } else if(name === user.name && email === user.email){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailOnError, nameOnError, name, email, patchUserIsError, formValid, user])

    const emailhandle = (e) => {
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
    const namehandle = (e) => {
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
    const blurhandle = e => {
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
    const handleOnEditForm = () => {
        setOnEditForm(true);
    }
    const handleOffEditForm = (e) => {
        e.preventDefault();
        setFormValid(false);
        handlePatchUser({email, name});

        if(patchUserIsError) {
            setOnEditForm(true);
        } else {
            setOnEditForm(false);
        }
    }
    return (
        <>
            <HeaderResult
                handleMenuIsActive={handleMenuIsActive}
                menuIsActive={menuIsActive}
                handleButtonLogo={handleButtonLogo}
                handleButtonSavedMovies={handleButtonSavedMovies}
                handleButtonMovies={handleButtonMovies}
                handleButtonProfile={handleButtonProfile}
            />
            {menuIsActive && <Menu
                handleMenuIsActive={handleMenuIsActive}
            />}
            <InfoTooltip
                onClose={onClose}
                infoToolTip={infoToolTip}
                patchUserIsError={patchUserIsError} //
            />
            <div className='profile'>
                <form className='profile__form'>
                    <h3 className='profile__title'>Привет, {name}!</h3>
                    <div className='profile__block'>
                        <label className='profile__text' htmlFor='profile-name'>Имя</label>
                        <input
                            onChange={namehandle}
                            onBlur={blurhandle}
                            className='profile__input'
                            name='profile-name'
                            value={name}
                            type='text'
                            id='profile-name'
                            disabled={!onEditForm}
                            placeholder='Имя'
                            required>
                        </input>
                    </div>
                    <span
                        className={`profile__input-error ${nameOnError && 'profile__input-error_visible'}`}>
                                {nameError}
                            </span>
                    <div className='profile__line'></div>
                    <div className='profile__block'>
                        <label className='profile__text' htmlFor='profile-email'>E-mail</label>
                        <input
                            onChange={emailhandle}
                            onBlur={blurhandle}
                            className='profile__input'
                            name='profile-email'
                            value={email}
                            type='email'
                            id='profile-email'
                            disabled={!onEditForm}
                            placeholder='E-mail'
                            required>
                        </input>
                    </div>
                    <span
                        className={`profile__input-error ${emailOnError && 'profile__input-error_visible'}`}>
                                {emailError}
                    </span>
                    {onEditForm ? (
                        <>
                            <span
                                className={`profile__input-error ${patchUserIsError && 'profile__input-error_visible'}`}>
                                    При обновлении профиля произошла ошибка.
                            </span>
                            <button
                                className={`profile__submit-btn ${formValid && 'profile__submit-btn_active'}`}
                                type='button'
                                onClick={handleOffEditForm}
                                disabled={!formValid}>
                                Сохранить
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleOnEditForm}
                                type='button'
                                name='profile__edit-btn'
                                className='profile__edit-btn'>
                                Редактировать
                            </button>
                            <button
                                onClick={handleUserExit}
                                type='button'
                                name='profile__exit-btn'
                                className='profile__exit-btn'>
                                Выйти из аккаунта
                            </button>
                        </>
                    )}
                </form>
            </div>
        </>
    )
}