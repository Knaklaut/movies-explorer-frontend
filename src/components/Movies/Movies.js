import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import tempArr from '../../utils/temporary';

const Movies = () => {
  const handleSendQuery = () => {};
  return (
    <main>
      <SearchForm handleSendQuery={handleSendQuery} />
      <MoviesCardList movies={tempArr} />
    </main>
  )
};

export default Movies;
