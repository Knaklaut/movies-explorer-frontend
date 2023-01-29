import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ShortMoviesFilter.css';

const ShortMoviesFilter = ({ handleChangeFilter }) => {
  const { pathname } = useLocation();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (pathname === '/movies') {
      const storedShortMovies = JSON.parse(localStorage.getItem('storedShortMovies'));
      storedShortMovies && setIsChanged(storedShortMovies);
    } else {
      setIsChanged(false);
    }
  }, []);

  function handleUpdateData() {
    setIsChanged(!isChanged);
    handleChangeFilter(!isChanged);
  };

  return (
    <div className="filter">
      <label className="filter__container">
        <input onChange={handleUpdateData} checked={isChanged} className="filter__checkbox" type='checkbox' />
        <span className="filter__switcher" />
        <span className="filter__caption">Короткометражки</span>
      </label>
      <div className="search-form__divider"></div>
    </div>
  )
};

export default ShortMoviesFilter;
