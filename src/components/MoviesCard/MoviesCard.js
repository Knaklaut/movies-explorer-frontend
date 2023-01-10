import { useLocation } from 'react-router-dom';
import {useState} from 'react';
import cn from 'classnames';

import './MoviesCard.css';

const MoviesCard = ({movie}) => {
  const { pathname } = useLocation();
  const { image, trailerLink, nameRU, duration } = movie;
  const [isSaved, setIsSaved] = useState(false);
  const handleSaveMovie = () => setIsSaved(true);
  const handleDeleteMovie = () => setIsSaved(false);

  const cardButtons = cn("movie-card__button", {
    "movie-card__button_save": pathname === '/movies' && isSaved,
    "movie-card__button_delete": pathname === '/saved-movies',
  });

  function formatDuration(duration) {
    const hours = Math.trunc(duration/60);
    const mins = duration % 60;
    return `${hours}ч ${mins}м`;
  }

  return (
    <li className="movie-card">
      <a href={trailerLink} className="movie-card__link" target='_blank' rel='noreferrer'>
        <img className="movie-card__img" src={image} alt={nameRU} />
      </a>
      <div className="movie-card__info">
        <div className="movie-card__content">
          <p className="movie-card__title">{nameRU}</p>
          <button onClick={isSaved ? handleDeleteMovie : handleSaveMovie} className={cardButtons} type='button' />
        </div>
        <p className="movie-card__duration">{formatDuration(duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
