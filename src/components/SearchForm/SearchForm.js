import {useState} from 'react';
import './SearchForm.css';

const SearchForm = ({ handleSendQuery }) => {
  const [query, setQuery] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const handleInputQuery = (evt) => setQuery(evt.target.value);
  const onSubmit = (evt) => {
    evt.preventDefault();
    handleSendQuery(query);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form onSubmit={onSubmit} className="search-form__form" name='search-form' action='' method=''>
          <input onChange={handleInputQuery} className="search-form__input" value={query} name='search' type='text' placeholder='Фильм' required />
          <button className="search-form__button" type='submit' />
        </form>
        <div isShortMovie={isShortMovie} setIsShortMovie={setIsShortMovie} className="filter">
          <label className="filter__container">
            <input onClick={() => setIsShortMovie(!isShortMovie)} checked={isShortMovie} className="filter__checkbox" type='checkbox' />
            <span className="filter__switcher" />
            <span className="filter__caption">Короткометражки</span>
          </label>
        </div>
        <div className="search-form__divider"></div>
      </div>
    </section>
  )
};

export default SearchForm;
