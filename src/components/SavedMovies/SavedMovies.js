import { useState, useEffect, useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({ query: '', isShortMovie: false });
  const [errorMessage, setErrorMessage] = useState('');
  const { savedMovies } = useContext(CurrentUserContext);

  function filterMovies(movies, query, isShortMovie) {
    const input = query.toLowerCase().trim();
    const searchResults = movies
      .filter((movie) => {
        const nameRu = movie.nameRU && movie.nameRU.toLowerCase().trim();
        const nameEn = movie.nameEN && movie.nameEN.toLowerCase().trim();
        return (nameRu.match(input)) || (nameEn && nameEn.match(input));
      });
    if (isShortMovie) {
      return searchResults.filter((movie) => movie.duration <= 40);
    }
    return searchResults;
  };

  function getFilteredMovies(query, isShortMovie) {
    const filteredMovies = filterMovies(savedMovies, query, isShortMovie);
    filteredMovies.length === 0 ? setErrorMessage('По вашему запросу ничего не найдено.') : setErrorMessage('');
    !savedMovies.length ? setErrorMessage('Сохранённые фильмы отсутствуют.') : setErrorMessage('');
    setMovies(filteredMovies);
  };

  useEffect(() => {
    setMovies(savedMovies);
    getFilteredMovies(searchParams.query, searchParams.isShortMovie);
    !savedMovies.length ? setErrorMessage('Сохранённые фильмы отсутствуют.') : setErrorMessage('');
  }, [savedMovies]);

  function handleTick(isActivated) {
    setSearchParams({ ...searchParams, isShortMovie: isActivated });
    getFilteredMovies(searchParams.query, isActivated);
  };

  function handleSubmitSearch(search) {
    setSearchParams({...searchParams, query: search});
    getFilteredMovies(search, searchParams.isShortMovie);
  };

  function showMovies() {
    if (errorMessage.length) {
      return console.log({ errorMessage });
    }
    return (
      <MoviesCardList movies={movies} />
    )
  };

  return (
    <main>
      <SearchForm handleTick={handleTick} handleSubmitSearch={handleSubmitSearch} showError={setErrorMessage} />
      {showMovies()}
    </main>
  )
};

export default SavedMovies;
