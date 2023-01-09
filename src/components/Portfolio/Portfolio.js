import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__bullet">
          <a href="https://knaklaut.github.io/how-to-learn/" className="portfolio__bullet-name" target="_blank" rel="noreferrer">
            Статичный сайт
            <span className="portfolio__pointer">↗</span>
          </a>
        </li>
        <li className="portfolio__bullet">
          <a href="https://knaklaut.github.io/russian-travel/index.html" className="portfolio__bullet-name" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <span className="portfolio__pointer">↗</span>
          </a>
        </li>
        <li className="portfolio__bullet">
          <a href="https://knaklaut.github.io/mesto/index.html" className="portfolio__bullet-name" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <span className="portfolio__pointer">↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
};

export  default Portfolio;
