import {useLocation} from 'react-router-dom';
import cn from 'classnames';

import './Menu.css';

const Menu = ({loggedIn, isOpen, setIsOpen}) => {
  const { pathname } = useLocation();

  const classNames = cn("menu", { "menu_type_open": !isOpen, "menu_type_close": isOpen, "menu_type_hidden": !loggedIn });

  const handleActivateMenu = () => setIsOpen(!isOpen);

  return (
    <button onClick={handleActivateMenu} className={classNames} type='button'></button>
  )
};

export default Menu;
