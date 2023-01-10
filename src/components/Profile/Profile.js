import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const user = 'Сергей';
  const [name, setName] = React.useState(user);
  const [email, setEmail] = React.useState('serjio.ermilov@gmail.com');
	
	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
	}

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__greeting">{`Привет, ${user}!`}</h2>
        <form className="profile__form">
          <label className="profile__label">
            Имя
            <input onChange={handleChangeName} className="profile__input" value={name} type='text' name='name' id='name' minLength='2' maxLength='30' required />
          </label>
          <label className='profile__label'>Email
            <input onChange={handleChangeEmail} className="profile__input" value={email} type='email' name='email' id='email' minLength='2' maxLength='30' required />
          </label>
            <button className="profile__button profile__button_type_edit" type='submit'>Редактировать</button>
            <button className="profile__button profile__button_type_exit" type='button'><Link to='/' className="profile__link">Выйти из аккаунта</Link></button>
        </form>
      </div>  
    </section>
  );
}
  
export default Profile;
