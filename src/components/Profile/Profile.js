import { useState, useContext, useRef } from 'react';

import MainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/utils';
import { validationScheme, userNotification } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

import './Profile.css';

const Profile = ({ signOut, setPopupDetails, setPopupOpen }) => {
  const userContext = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(userContext.currentUser);
  const [error, setError]= useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef(false);
  const initialValues = { username: userData.name, email: userData.email };
  const { handleChange, values, errors, isValid, resetValues } = useFormWithValidation({ initialValues });
  const isButtonActive = isValid && !isLoading && (values.username !== initialValues.username || values.email !== initialValues.email);

  async function handleEdit(evt) {
    evt.preventDefault();
    await setIsEdit(true);
    nameInputRef.current.focus();
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setUserData({ name: values.username, email: values.email });
    setError('');
    MainApi.changeUserInfo({ name: values.username, email: values.email })
    .then((data) => {
      setPopupOpen(true);
      setIsEdit(false);
      setError('');
      setPopupDetails({ message: userNotification.updatedUserDataNotice, isDataAccepted: true })
      resetValues({ username: data.name, email: data.email })
    })
    .catch(async (err) => {
      const { message } = await err.json();
      setPopupOpen(true);
      setPopupDetails({ message: userNotification.badReqNotice, isDataAccepted: false })
      setError(message);
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__greeting">{`Привет, ${userData.name}!`}</h2>
        <form onSubmit={handleSubmit} className="profile__form" name={`form-profile`}>
          <label htmlFor='name' className="profile__label">
            Имя
            <input onChange={handleChange} className="profile__input" value={values.username || ''} ref={nameInputRef} pattern={validationScheme.username.pattern} disabled={isLoading || !isEdit} name='username' id='name' type='text' minLength='2' maxLength='30' />
          </label>
          <label htmlFor='email' className="profile__label">
            E-mail
            <input onChange={handleChange} className="profile__input" value={values.email || ''} pattern={validationScheme.email.pattern} disabled={isLoading || !isEdit} name='email' id='email' type='email' minLength='8' maxLength='30' />
          </label>
          {isLoading ? <Preloader /> : ''}
          <p className="profile__err">{errors.username || errors.email}</p>
          { isEdit ? <button className="profile__button profile__button_type_save" type='submit' disabled={!isButtonActive}>Сохранить</button> : <button className="profile__button profile__button_type_edit" type='button' onClick={handleEdit}>Редактировать</button> }
          { !isEdit ? <button className="profile__button profile__button_type_exit" type='button' onClick={signOut}>Выйти из аккаунта</button> : '' }
        </form>
      </div>
    </section>
  )
}

export  default Profile;
