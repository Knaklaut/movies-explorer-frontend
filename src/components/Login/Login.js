import FormTemplate from '../FormTemplate/FormTemplate';
import { validationScheme } from '../../utils/constants';
import { useFormWithValidation } from '../../utils/utils';

import './Login.css';

const Login = ({ handleLogin, isLoading }) => {
  const { handleUpdateData, inputData, errors, isValid } = useFormWithValidation();

  function handleSubmitData(evt) {
    evt.preventDefault();
    handleLogin(inputData.email, inputData.password);
  };

  return (
    <FormTemplate onSubmit={handleSubmitData} isValid={isValid} isLoading={isLoading} formTitle='login' greeting='Рады видеть!' text='Ещё не зарегистрированы?' buttonCaption='Войти' linkCaption='Регистрация' link='signup'>
      <label htmlFor='email' className="form__label">
        E-mail
        <input onChange={handleUpdateData} value={inputData.email || ''} pattern={validationScheme.email.scheme} disabled={isLoading} className="form__input" type='email' name='email' id='email' minLength='5' maxLength='30' required />
        <span className="form__error" id='email-error'>{errors.email}</span>
      </label>
      <label htmlFor='password' className="form__label">
        Пароль
        <input onChange={handleUpdateData} value={inputData.password || ''} disabled={isLoading} className="form__input" type='password' name='password' id='password' maxLength='30' required />
        <span className="form__error" id='password-error'>{errors.password}</span>
      </label>
    </FormTemplate>
  )
};

export default Login;
