import './Profile.css';
export default function Profile(){
    return (
        <div className='profile'>
            <div className='profile__container'>
                <h3 className='profile__title'>Привет, Виталий!</h3>
                <div className='profile__block'>
                    <p className='profile__text'>Имя</p>
                    <p className='profile__text'>Виталий</p>
                </div>
                <div className='profile__line'></div>
                <div className='profile__block'>
                    <p className='profile__text'>E-mail</p>
                    <p className='profile__text'>pochta@yandex.ru</p>
                </div>
                <p className='profile__edit'>Редактировать</p>
                <p className='profile__exit'>Выйти из аккаунта</p>
            </div>
        </div>
    )
}