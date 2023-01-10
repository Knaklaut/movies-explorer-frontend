import { Link } from 'react-router-dom';

import './NavTab.css';

const NavTab = () => {
    return(
        <nav className="nav">
            <Link to='/signup' className="nav__register">Регистрация</Link>
            <Link to='/signin' className="nav__login">Войти</Link>
        </nav>
    )
};

export default NavTab;