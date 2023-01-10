import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__key-points">
          <li>
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__schedule">
          <p className="about-project__duration about-project__back-end">1 неделя</p>
          <p className="about-project__duration about-project__front-end">4 недели</p>
          <p className="about-project__duration about-project__back-end about-project__label">Back-end</p>
          <p className="about-project__duration about-project__front-end about-project__label">Front-end</p>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;
