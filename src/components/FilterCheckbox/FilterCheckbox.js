import './FilterCheckbox.css';
import {useEffect, useState} from "react";
export default function FilterCheckbox(props){
    const {
        setIsShortFilm,
        updateMovies
    } = props

    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(JSON.parse(localStorage.getItem('isShortFilm')));
    }, [updateMovies])
    const handleCheckedShortFilm = () => {
        setChecked(!checked);
        if(checked) {
            setIsShortFilm(false);
        } else {
            setIsShortFilm(true);
        }
        console.log(checked);
    }
    return (
        <div className='filter-checkbox'>
            <div className='filter-checkbox__line'></div>
            <div className='filter-checkbox__radio-block'>
                <input className='filter-checkbox__radio'
                       onChange={handleCheckedShortFilm}
                       type='checkbox' id='short-films'
                       name='short-films'
                       checked={checked}
                />
                <label className='filter-checkbox__label' htmlFor='short-films'></label>
            </div>
            <label className='filter-checkbox__text'>Короткометражки</label>
        </div>
    )
}