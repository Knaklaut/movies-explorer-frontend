const urlMain = 'https://api.knaklaut.nomoredomains.icu';
const urlMovies = 'https://api.nomoreparties.co/beatfilm-movies';

const validationScheme = {
  username: {
    scheme: '^[A-Za-zА-Яа-яЁё /s -]+$',
    message: 'Введено некорректное имя.',
  },
  email: {
    scheme: '^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$',
    message: 'Введён некорректный email.',
  },
};

export {
  urlMain,
  urlMovies,
  validationScheme,
};
