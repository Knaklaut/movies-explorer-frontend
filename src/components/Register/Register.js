import { useFormWithValidation } from '../../utils/utils';
import { validationScheme } from '../../utils/constants';
import FormTemplate from '../FormTemplate/FormTemplate';

const Register = ({ handleRegister, isLoading }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmitUserInfo(evt) {
    evt.preventDefault();
    handleRegister(values.username, values.email, values.password);
  };

  return (
    <FormTemplate onSubmit={handleSubmitUserInfo} isLoading={isLoading} isValid={isValid} formTitle='register' greeting='Добро пожаловать!' buttonCaption='Зарегистрироваться' text='Уже зарегистрированы?' linkCaption='Войти' link='signin'>
      <label htmlFor='name' className="form__label">
        Имя
        <input onChange={handleChange} value={values.username || ''} pattern={validationScheme.username.pattern} disabled={isLoading} className='form__input' name='username' id='name' type='text' minLength='2' maxLength='30' required />
        <span className="form__error" id='name-error'>{errors.username}</span>
      </label>
      <label htmlFor='email' className="form__label">
        E-mail
        <input onChange={handleChange} value={values.email || ''} pattern={validationScheme.email.pattern} disabled={isLoading} className="form__input" name='email' id='email' type='email' minLength='8' maxLength='30' required />
        <span className="form__error" id='email-error'>{errors.email}</span>
      </label>
      <label htmlFor='password' className="form__label">
        Пароль
        <input onChange={handleChange} value={values.password || ''} disabled={isLoading} className="form__input" name='password' id='password' type='password' maxLength='30' required />
        <span className="form__error" id='password-error'>{errors.password}</span>
      </label>
    </FormTemplate>
  )
};

export default Register;
