import './Promo.css';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <div className="promo__button">
          <a href="#about-project" className="promo__link">Узнать больше</a>
        </div>
      </div>
    </section>
  )
};

export default Promo;
