import './Profile.css';
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Profile(props){
    const {
        handlerUserExit
    } = props;
    const currentUser = useContext(CurrentUserContext);
    const {
        name,
        email,
    } = currentUser;
    return (
        <div className='profile'>
            <div className='profile__container'>
                <h3 className='profile__title'>Привет, Виталий!</h3>
                <div className='profile__block'>
                    <label className='profile__text' htmlFor='profile-name'>Имя</label>
                    <input className='profile__input' name='profile-name' value={name} type='text' id='profile-name'></input>
                </div>
                <div className='profile__line'></div>
                <div className='profile__block'>
                    <label className='profile__text' htmlFor='profile-email'>E-mail</label>
                    <input className='profile__input' name='profile-email' value={email} type='text' id='profile-email'></input>
                </div>
                <button type='button' name='profile__edit-btn' className='profile__edit-btn'>Редактировать</button>
                <button onClick={handlerUserExit} type='button' name='profile__exit-btn' className='profile__exit-btn'>Выйти из аккаунта</button>
            </div>
        </div>
    )
}