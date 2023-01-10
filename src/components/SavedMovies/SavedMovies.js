import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import tempArr from '../../utils/temporary';

const SavedMovies = () => {
  return (
    <main>
      <SearchForm />
      <MoviesCardList movies={tempArr} />
    </main>
  )
};

export default SavedMovies;
