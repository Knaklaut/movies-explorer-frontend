import cn from 'classnames';

import './Menu.css';

const Menu = ({ loggedIn, isOpen, setIsOpen }) => {
  const classNames = cn("menu", {
    "menu_type_open": !isOpen, 
    "menu_type_close": isOpen,
    "menu_type_hidden": !loggedIn,
  });
  const handleActivateMenu = () => setIsOpen(!isOpen);

  return (
    <button className={classNames} onClick={handleActivateMenu} type='button' />
  )
};

export default Menu;
