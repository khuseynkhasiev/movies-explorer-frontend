import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
export default function SearchForm(){
    return (
        <section className='search-form'>
            <div className='search-form__container'>
                <form className='search-form__form'>
                    <div className='search-form__movie-search'>
                        <div className='search-form__search-icon'></div>
                        <input className='search-form__input' type='text' placeholder='Фильм' required/>
                        <button className='search-form__submit' type='submit' />
                    </div>
                    <FilterCheckbox />
                </form>
                <div className='search-form__line'></div>
            </div>
        </section>
    )
}