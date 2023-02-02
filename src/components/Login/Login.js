import FormTemplate from '../FormTemplate/FormTemplate';
import { validationScheme } from '../../utils/constants';
import { useFormWithValidation } from '../../utils/utils';

import './Login.css';

const Login = ({ handleLogin, isLoading }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmitUserInfo(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
  };

  return (
    <FormTemplate onSubmit={handleSubmitUserInfo} isValid={isValid} isLoading={isLoading} formTitle='login' greeting='Рады видеть!' text='Ещё не зарегистрированы?' buttonCaption='Войти' linkCaption='Регистрация' link='signup'>
      <label htmlFor='email' className="form__label">
        E-mail
        <input onChange={handleChange} value={values.email || ''} pattern={validationScheme.email.pattern} disabled={isLoading} className="form__input" type='email' name='email' id='email' minLength='5' maxLength='30' required />
        <span className="form__error" id='email-error'>{errors.email}</span>
      </label>
      <label htmlFor='password' className="form__label">
        Пароль
        <input onChange={handleChange} value={values.password || ''} disabled={isLoading} className="form__input" type='password' name='password' id='password' maxLength='30' required />
        <span className="form__error" id='password-error'>{errors.password}</span>
      </label>
    </FormTemplate>
  )
};

export default Login;
