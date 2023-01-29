import { useFormWithValidation } from '../../utils/utils';
import { validationScheme } from '../../utils/constants';
import FormTemplate from '../FormTemplate/FormTemplate';

const Register = ({ handleRegister, isLoading }) => {
  const { handleUpdateData, inputData, errors, isValid } = useFormWithValidation();

  function handleSubmitData(evt) {
    evt.preventDefault();
    handleRegister(inputData.username, inputData.email, inputData.password);
  };

  return (
    <FormTemplate onSubmit={handleSubmitData} isLoading={isLoading} isValid={isValid} formTitle='register' greeting='Добро пожаловать!' buttonCaption='Зарегистрироваться' text='Уже зарегистрированы?' linkCaption='Войти' link='signin'>
      <label className="form__label" htmlFor='name'>
        Имя
        <input onChange={handleUpdateData} value={inputData.username || ''} pattern={validationScheme.username.scheme} disabled={isLoading} className="form__input" name='username' id='name' type='text' minLength='2' maxLength='30' required />
        <span className="form__error" id='name-error'>{errors.username}</span>
      </label>
      <label className="form__label" htmlFor='email'>
        E-mail
        <input onChange={handleUpdateData} value={inputData.email || ''} pattern={validationScheme.email.scheme} disabled={isLoading} className="form__input" name='email' id='email' type='email' minLength='8' maxLength='30' required />
        <span className="form__error" id='email-error'>{errors.email}</span>
      </label>
      <label className="form__label" htmlFor='password'>
        Пароль
        <input onChange={handleUpdateData} value={inputData.password || ''} disabled={isLoading} className="form__input" name='password' id='password' type='password' maxLength='30' required />
        <span className="form__error" id='password-error'>{errors.password}</span>
      </label>
    </FormTemplate>
  )
};

export default Register;
