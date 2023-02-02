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

const userNotification = {
  loginNotice: 'Вы вошли в приложение.',
  updatedUserDataNotice: 'Ваши данные успешно изменены.',
  noMoviesFoundNotice: 'По вашему запросу ничего не найдено.',
  noSavedMoviesNotice: 'Сохранённые фильмы отсутствуют.',
  errorNotice: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  badReqNotice: 'Что-то пошло не так.',
}

const movieRegExp = /(https?:\/\/)(www\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const movieSpecifics = {
  shortMovieMaxDuration: 40,
  moviesShownMobile: 5,
  moviesShownTablet: 8,
  moviesShownDesktop: 12,
  moviesAddedMobileOrTablet: 2,
  moviesAddedDesktop: 3,
}

const screenWidth = {
  tablet: 768,
  desktop: 1280,
}

export {
  urlMain,
  urlMovies,
  validationScheme,
  userNotification,
  movieRegExp,
  movieSpecifics,
  screenWidth,
};
