import { Link } from 'react-router-dom';

import './FormTemplate.css';

import logo from '../../images/logo.svg';

const FormTemplate = (props) => {
  const { children, onSubmit, greeting, buttonCaption, formTitle, text, link, linkCaption } = props;

  return (
    <section className="form">
      <div className="form__content">
        <Link to='/' className="form__landing-link">
          <img src={logo} className="form__logo" alt="Логотип Movies Explorer" />
        </Link>
        <h1 className="form__greeting">{greeting}</h1>
      </div>
      <form onSubmit={onSubmit} className="form__body" name={`form-${formTitle}`} action='' method=''>
        {children}
        <button className="form__button" type='submit'>{buttonCaption}</button>
      </form>
      <p className="form__text">{text}&nbsp;
        <Link to={`/${link}`} className="form__link">{linkCaption}</Link>
      </p>
    </section>
  )
};

export default FormTemplate;
