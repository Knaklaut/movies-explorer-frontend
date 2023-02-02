import { Link } from 'react-router-dom';
import cn from 'classnames';

import Preloader from '../Preloader/Preloader';

import './FormTemplate.css';
import logo from '../../images/logo.svg';

const FormTemplate = (props) => {
  const { children, onSubmit, formTitle, greeting, isValid, isLoading, text, buttonCaption, link, linkCaption } = props;
  const classNames = cn("form__button", { "form__button_disabled": !isValid || isLoading });

  return (
    <section className="form">
      <div className="form__content">
        <Link to='/' className="form__landing-link">
          <img className="form__logo" src={logo} alt='Логотип Movies Explorer' />
        </Link>
        <h2 className="form__greeting">{greeting}</h2>
      </div>
      <form onSubmit={onSubmit} className="form__body" name={`form-${formTitle}`}>
        {children}
        {isLoading ? <Preloader /> : ''}
        <button className={classNames} disabled={!isValid || isLoading} type='submit'>{buttonCaption}</button>
      </form>
      <p className="form__text">{text}&nbsp;<Link to={`/${link}`} className="form__link">{linkCaption}</Link></p>
    </section>
  )
};

export default FormTemplate;
