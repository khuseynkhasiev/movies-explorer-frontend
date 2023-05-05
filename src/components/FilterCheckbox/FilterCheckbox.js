import './FilterCheckbox.css';
export default function FilterCheckbox(){
    return (
        <div className='filter-checkbox'>
            <div className='filter-checkbox__line'></div>
            <div className='filter-checkbox__radio-block'>
                <input className='filter-checkbox__radio' type='radio' id='short-films' name='short-films' />
            </div>
            <label className='filter-checkbox__text'>Короткометражки</label>
        </div>
    )
}