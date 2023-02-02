import { useClose } from '../../utils/utils';

import './PopupForm.css';

const PopupForm = ({onClose, isOpen, popupDetails, onOverlayClick}) => {
  useClose(isOpen, onClose);
  const message = `${popupDetails.message}`

  return (
    <section onClick={onOverlayClick} className={`popup ${isOpen ? "popup_opened" : ""}`} id='popup-info-tooltip'>
      <div className="popup__container">
        <button onClick={onClose} className="popup__button" type='button' />
        <p className="popup__notice">{message}</p>
      </div>
    </section>
  )
}

export default  PopupForm;
