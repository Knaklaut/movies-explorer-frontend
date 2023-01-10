import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import './Header.css';

import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab'
import Menu from '../Menu/Menu';

const Header = () => {
  const { pathname } = useLocation();
  const [loggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const classNames = cn("header", { "header__landing" : pathname === '/', });

  return (
    <header className={classNames}>
      <div className="header__container">
        <Menu loggedIn={loggedIn} isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} />
        <Link to='/'><img src={logo} alt='Логотип Movies Explorer' className="header__logo" /></Link>
        { loggedIn ? <Navigation isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} /> : <NavTab></NavTab> }
      </div>
    </header>
  )
};

export default Header;
