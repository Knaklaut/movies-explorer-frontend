import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/Knaklaut" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
