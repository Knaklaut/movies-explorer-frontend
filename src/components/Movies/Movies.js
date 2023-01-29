import { useState, useEffect } from 'react';

import MoviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const baseStorage = JSON.parse(localStorage.getItem('baseStorage')) || [];
  const [isLoading, setIsLoading] = useState(false);
  const regExp = /(https?:\/\/)(www\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

  useEffect(() => {
    const storedQuery = localStorage.getItem('storedQuery') || '';
    const storedSearch = JSON.parse(localStorage.getItem('storedSearch')) || [];
    const storedShortMovies = JSON.parse(localStorage.getItem('storedShortMovies')) || false;
    storedQuery && setQuery(storedQuery);
    storedSearch && setSearchResults(storedSearch);
    storedShortMovies && setIsShortMovie(storedShortMovies);
  }, []);

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

  function formatMovies(movies) {
    return movies.map((movie) => ({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co/${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }))
      .map((movie) => (regExp.test(movie.trailerLink) ? movie : { ...movie, trailerLink: movie.image }));
  };

  function arrangeFilteredMovies(movies) {
    setSearchResults(movies);
    localStorage.setItem('storedSearch', JSON.stringify(movies));
    movies.length === 0 ? setErrorMessage('Ничего не найдено.') : setErrorMessage('');
  };

  function getFilteredMovies(query, isShortMovie) {
    if (!baseStorage.length) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((movieSet) => {
          const normalizedMovies = formatMovies(movieSet);
          localStorage.setItem('baseStorage', JSON.stringify(normalizedMovies));
          const filteredMovies = query ? filterMovies(normalizedMovies, query, isShortMovie) : [];
          arrangeFilteredMovies(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = query ? filterMovies(baseStorage, query, isShortMovie) : [];
        arrangeFilteredMovies(filteredMovies);
    }
  };

  function handleSubmitSearch(query) {
    setQuery(query);
    localStorage.setItem('storedQuery', query);
    getFilteredMovies(query, isShortMovie);
  };

  function showMovies() {
    if (errorMessage.length) {
      return <p className='cards__search-message'>{errorMessage}</p>;
    }
    return (<MoviesCardList movies={searchResults} />)
  };

  function handleTick(isChecked) {
    setIsShortMovie(isChecked);
    localStorage.setItem('storedShortMovies', isChecked);
    getFilteredMovies(query, isChecked);
  };

  return (
    <main>
      <SearchForm handleTick={handleTick} handleSubmitSearch={handleSubmitSearch} showError={setErrorMessage} isLoading={isLoading} />
      {isLoading ? <Preloader /> : showMovies()}
    </main>
  )
};

export default Movies;
