import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

import MainApi from '../../utils/MainApi';
import currentUserContext from '../../contexts/CurrentUserContext';

import './MoviesCard.css';

const MoviesCard = ({ movie, updateCurrentState }) => {
  const { pathname } = useLocation();
  const { thumbnail, trailerLink, nameRU, duration } = movie;
  const { savedMovies, setSavedMovies } = useContext(currentUserContext);
  const [basicId, setBasicId] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classNames = cn("movie-card__button", {
    "movie-card__button_save": pathname === '/movies' && isSaved,
    "movie-card__button_delete": pathname === '/saved-movies',
    "movie-card__button_disabled": isLoading,
  });

  useEffect(() => {
    setIsSaved(updateCurrentState.isSaved);
    setBasicId(updateCurrentState.id);
  }, [updateCurrentState]);

  function handleSaveMovie() {
    setIsLoading(true);
    MainApi.saveMovie(movie)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setIsSaved(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleDeleteMovie() {
    setIsLoading(true);
    MainApi.deleteMovie(basicId)
      .then(() => {
        setSavedMovies(savedMovies.filter((info) => {
          return !(info._id === basicId);
        }));
        setIsSaved(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function formatDuration(duration) {
    const hours = Math.trunc(duration/60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
  }

  return (
    <li className="movie-card">
      <a href={trailerLink} className="movie-card__link" target='_blank' rel='noreferrer'>
        <img className="movie-card__img" src={thumbnail} alt={nameRU} />
      </a>
      <div className="movie-card__info">
        <div className="movie-card__content">
          <p className="movie-card__title">{nameRU}</p>
          <button onClick={isSaved ? handleDeleteMovie : handleSaveMovie} className={classNames} type='button' disabled={isLoading} />
        </div>
        <p className="movie-card__duration">{formatDuration(duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
