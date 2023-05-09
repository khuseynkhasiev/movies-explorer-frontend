import './Menu.css';
export default function Menu(){
    return (
        <div className='menu'>
            <div className='menu__exit-icon'></div>
            <nav className='menu__nav'>
                <ul className='menu__nav-list'>
                    <li className='menu__nav-item'><a className='menu__nav-link'>Главная</a></li>
                    <li className='menu__nav-item'><a className='menu__nav-link menu__nav-link_active'>Фильмы</a></li>
                    <li className='menu__nav-item'><a className='menu__nav-link'>Сохранённые фильмы</a></li>
                </ul>
            <a className='menu__profile-block'>
                <div className='menu__profile-icon'></div>
                <p className='menu__profile-text'>Аккаунт</p>
            </a>
            </nav>
        </div>
    )
}