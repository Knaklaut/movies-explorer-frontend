import FormTemplate from '../FormTemplate/FormTemplate';

import './Login.css';

const Login = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <FormTemplate onSubmit={handleSubmit} formTitle='login' greeting='Рады видеть!' buttonCaption='Войти' text='Ещё не зарегистрированы?' linkCaption='Регистрация' link='signup'>
      <label className="form__label" htmlFor='email'>
        E-mail
        <input className="form__input" name='email' id='email' type='email' required />
        <span className="form__err" id='email-err' />
      </label>
      <label className="form__label" htmlFor='password'>
        Пароль
        <input className="form__input" name='password' id='password' type='password' required />
        <span className="form__err" id='password-err' />
      </label>
    </FormTemplate>
  )
};

export default Login;
