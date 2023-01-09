import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  const handleButtonClick = () => {};

  return (
    <section className="cards-list">
      <div className="cards-list__content">
        <ul className="cards-list__items">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
        <button onClick={handleButtonClick} className="cards-list__button" type="button">Ещё</button>
      </div>
    </section>
  )
};

export default MoviesCardList;
