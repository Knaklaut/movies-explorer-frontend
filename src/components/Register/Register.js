import FormTemplate from '../FormTemplate/FormTemplate';

const Register = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <FormTemplate onSubmit={handleSubmit} formTitle='register' greeting='Добро пожаловать!' buttonCaption='Зарегистрироваться' text='Уже зарегистрированы?' linkCaption='Войти' link='signin'>
      <label className="form__label" htmlFor='name'>
        Имя
        <input className="form__input" name='name' id='name' type='text' required />
        <span className="form__err" id='email-err' />
      </label>
      <label className="form__label" htmlFor='email'>
        E-mail
        <input className="form__input" name='email' id='email' type='email' required />
        <span className="form__err" id='email-err' />
      </label>
      <label className="form__label" htmlFor='email'>
        Пароль
        <input className="form__input" name='password' id='password' type='password' required />
        <span className="form__err" id='password-err' />
      </label>
    </FormTemplate>
  )
};

export default Register;
