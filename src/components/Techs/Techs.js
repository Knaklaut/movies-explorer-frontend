import './Techs.css';

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__bullet">HTML</li>
          <li className="techs__bullet">CSS</li>
          <li className="techs__bullet">JS</li>
          <li className="techs__bullet">React</li>
          <li className="techs__bullet">Git</li>
          <li className="techs__bullet">Express.js</li>
          <li className="techs__bullet">mongoDB</li>
        </ul>
      </div>
    </section>
  )
};

export default Techs;
