import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useFormWithValidation } from '../../utils/utils';
import ShortMoviesFilter from '../ShortMoviesFilter/ShortMoviesFilter';

import './SearchForm.css';

const SearchForm = ({ handleTick, handleSubmitSearch, showError, isLoading }) => {
  const { pathname } = useLocation();
  const { values, setValues, isValid, setIsValid, handleChange } = useFormWithValidation();

  useEffect(() => {
    if (pathname === '/movies') {
      const storedQuery = localStorage.getItem('storedQuery');
      storedQuery && setValues({ query: storedQuery });
      setIsValid(true);
    } else {
      setValues({query: ''});
    }
  }, [pathname]);

  function handleSubmitData(evt) {
    evt.preventDefault();
    handleSubmitSearch(values.query);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form onSubmit={handleSubmitData} className="search-form__form" name='search-form' noValidate>
          <input onChange={handleChange} value={values.query} disabled={isLoading} className="search-form__input" name='query' id='query' type='text' placeholder='Фильм' minLength='1' maxLength='50' required />
          <button className="search-form__button" type='submit' disabled={isLoading} />
        </form>
        <ShortMoviesFilter handleChangeFilter={handleTick} />
      </div>
    </section>
  )
};

export default SearchForm;
