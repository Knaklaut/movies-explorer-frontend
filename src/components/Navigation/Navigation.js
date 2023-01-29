import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.css';

const Navigation = ({ isOpen, setIsOpen, handleOverlayClick }) => {
  const { pathname } = useLocation();

  const navigationClassNames = cn("navigation", {
    "navigation_opened": isOpen,
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
          <Link to='/' onClick={() => { setIsOpen(false) }} className={mainClassNames}>Главная</Link>
          <Link to='/movies' onClick={() => { setIsOpen(false) }} className={moviesClassNames}>Фильмы</Link>
          <Link to='/saved-movies' onClick={() => { setIsOpen(false) }} className={savedMoviesClassNames}>Сохранённые фильмы</Link>
        </div>
        <Link to='/profile' onClick={() => { setIsOpen(false) }} className="navigation__user-profile-link">Аккаунт</Link>
      </nav>
    </div>
  )
};

export default Navigation;
