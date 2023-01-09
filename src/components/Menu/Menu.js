import cn from 'classnames';

import './Menu.css';

const Menu = ({ loggedIn, isOpen, setIsOpen }) => {
  const classNames = cn("menu", {
    "menu__type_open": !isOpen, 
    "menu__type_close": isOpen,
    "menu__type_hidden": !loggedIn,
  });
  const handleActivateMenu = () => setIsOpen(!isOpen);

  return (
    <button className={classNames} onClick={handleActivateMenu} type='button' />
  )
};

export default Menu;
