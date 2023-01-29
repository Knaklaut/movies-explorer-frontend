import { useState, useRef, useContext } from 'react';

import MainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../utils/utils';
import { validationScheme } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

import './Profile.css';

const Profile = ({ signOut }) => {
  const userContext = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(userContext.currentUser);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef(false);
  const currentInputData = { username: userData.name, email: userData.email };
  const { handleUpdateData, inputData, errors, isValid } = useFormWithValidation({ currentInputData });

  function handleEditData(evt) {
    evt.preventDefault();
    setIsEdit(true);
    nameInputRef.current.focus();
  }

  function handleSubmitData(evt) {
    evt.preventDefault();
    setError('');
    setIsLoading(true);
    setUserData({
      name: inputData.username,
      email: inputData.email,
    });

  MainApi.updateUserData({ name: inputData.username, email: inputData.email })
    .then(() => {
      setError('');
      setIsEdit(false);
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
}

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__greeting">{`Привет, ${userData.name}!`}</h2>
        <form onSubmit={handleSubmitData} className="profile__form" name={`form-profile`}>
          <label htmlFor='name' className="profile__label">
            Имя
            <input onChange={handleUpdateData} className="profile__input" value={inputData.username} ref={nameInputRef} pattern={validationScheme.username.scheme} disabled={isLoading || !isEdit} name='username' id='name' type='text' minLength='2' maxLength='30' />
          </label>
          <label htmlFor='email' className="profile__label">
            Email
            <input onChange={handleUpdateData} className="profile__input" value={inputData.email} pattern={validationScheme.email.scheme} disabled={isLoading || !isEdit} name='email' id='email' type='email' minLength='8' maxLength='30' />
          </label>
          {isLoading ? <Preloader /> : ''}
          <p className="profile__err">{errors.username || errors.email}</p>
          {isEdit ? <button className="profile__button profile__button_type_save" type='submit'>Сохранить</button> : <button className="profile__button profile__button_type_edit" type='button' onClick={handleEditData}>Редактировать</button>}
          <button className="profile__button profile__button_type_exit" type='button' onClick={signOut}>Выйти из аккаунта</button>
        </form>
      </div>  
    </section>
  );
}
  
export default Profile;
