import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.css';

const Navigation = ({ isMenuOpen, setIsMenuOpen, handleOverlayClick }) => {
  const { pathname } = useLocation();

  const navigationClassNames = cn("navigation", {
    "navigation_opened": isMenuOpen,
  });
  const mainClassNames = cn("navigation__link navigation__link_type_main", {
    "navigation__link_state_active": pathname === '/',
  })
  const moviesClassNames = cn("navigation__link", {
    "navigation__link_state_active": pathname === '/movies',
  });
  const savedMoviesClassNames = cn("navigation__link", {
    "navigation__link_state_active": pathname === '/saved-movies',
  });

  return (
    <div className={navigationClassNames} onClick={handleOverlayClick}>
      <nav className="navigation__content">
        <div className="navigation__wrapper">
          <Link to='/' onClick={() => { setIsMenuOpen(false) }} className={mainClassNames}>Главная</Link>
          <Link to='/movies' onClick={() => { setIsMenuOpen(false) }} className={moviesClassNames}>Фильмы</Link>
          <Link to='/saved-movies' onClick={() => { setIsMenuOpen(false) }} className={savedMoviesClassNames}>Сохранённые фильмы</Link>
        </div>
        <Link to='/profile' onClick={() => { setIsMenuOpen(false) }} className="navigation__user-profile-link">Аккаунт</Link>
      </nav>
    </div>
  )
};

export default Navigation;
