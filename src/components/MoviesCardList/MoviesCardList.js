import React, { useState, useEffect , useContext } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { movieSpecifics, screenWidth } from '../../utils/constants';

import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  const { savedMovies } = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const [addButton, setAddButton] = useState(false);
  const [movieNumber, setMovieNumber] = useState(0);
  const [device, setDevice] = useState(window.innerWidth);
  const handleSetDevice = () => setDevice(window.innerWidth);

  useEffect(() => {
    if (pathname === '/movies' ) {
      movies.length > movieNumber ? setAddButton(true) : setAddButton(false);
    } else {
      setAddButton(false);
    }
  }, [pathname, movies.length, movieNumber]);

  useEffect(() => {
    window.addEventListener('resize', handleSetDevice);
    return () => { window.removeEventListener('resize', handleSetDevice); };
  }, []);

  useEffect(() => {
    if (device <= screenWidth.tablet) {
      setMovieNumber(movieSpecifics.moviesShownMobile);
    } else if (device <= screenWidth.desktop) {
      setMovieNumber(movieSpecifics.moviesShownTablet);
    } else {
      setMovieNumber(movieSpecifics.moviesShownDesktop);
    }
  }, [device, movies.length]);

  function checkSavedMovie(movie) {
    const checkedMovie = savedMovies.find((film) => film.movieId === movie.movieId);
    return checkedMovie ? { isSaved: true, id: checkedMovie._id } : { isSaved: false, id: '' }
  };

  function showMovieCards() {
    if (pathname === '/movies') {
      return movies.length ? movies.slice(0, movieNumber).map((movie) => (
        <MoviesCard movie={movie} key={movie.movieId} updateCurrentState={checkSavedMovie(movie)} />
      )) : '';
    } else {
      return movies.length ? movies.map((movie) => (
        <MoviesCard movie={movie} key={movie.movieId} updateCurrentState={{ isSaved: true, id: movie._id }} />
      )) : '';
    }
  };

  function handleButtonClick() {
    setMovieNumber((current) => {
      if (device <= screenWidth.desktop) {
        return current + movieSpecifics.moviesAddedMobileOrTablet;
      }
      return current + movieSpecifics.moviesAddedDesktop;
    })
  };

  return (
    <section className="cards-list">
      <div className="cards-list__content">
        <ul className="cards-list__items">{showMovieCards()}</ul>
        {addButton ? <button onClick={handleButtonClick} className="cards-list__button" type='button'>Ещё</button> : ''}
      </div>
    </section>
  )
};

export default MoviesCardList;
