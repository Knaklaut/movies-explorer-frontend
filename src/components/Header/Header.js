import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab'

import './Header.css';
import logo from '../../images/logo.svg';

const Header = ({ loggedIn, isMenuOpen, setIsMenuOpen, handleOverlayClick }) => {
  const { pathname } = useLocation();

  const classNames = cn("header", { "header__landing" : pathname === '/', });

  return (
    <header className={classNames}>
      <div className="header__container">
        <Menu loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Link to='/' className={ loggedIn ? "" : "header__logo" }><img src={logo} alt='Логотип Movies Explorer' /></Link>
        { loggedIn ? <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick} /> : <NavTab /> }
      </div>
    </header>
  )
};

export default Header;
