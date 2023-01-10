import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = ({ isOpen }) => {

  return (
    <div className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <nav className="menu__content">
        <div className="menu__links">
          <NavLink exact to='/' className="menu__link" activeClassName="menu__link_selected">Главная</NavLink>
          <NavLink to='/movies' className="menu__link" activeClassName="menu__link_selected">Фильмы</NavLink>
          <NavLink to='/saved-movies' className="menu__link" activeClassName="menu__link_selected">Сохранённые фильмы</NavLink>
        </div>
        <Link to='/profile' className="menu__profile-link">Аккаунт</Link>
      </nav>
    </div>
  )
};

export default Navigation;
