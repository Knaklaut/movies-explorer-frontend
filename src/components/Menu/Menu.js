import {useLocation} from 'react-router-dom';
import cn from 'classnames';

import './Menu.css';

const Menu = ({loggedIn, isMenuOpen, setIsMenuOpen}) => {
  const { pathname } = useLocation();

  const classNames = cn("menu", { "menu_type_open": !isMenuOpen, "menu_type_close": isMenuOpen, "menu_type_hidden": !loggedIn });

  const handleActivateMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <button onClick={handleActivateMenu} className={classNames} type='button'></button>
  )
};

export default Menu;
