import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ message: '', statusOk: false, });
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      MainApi.setToken();
      Promise.all([MainApi.getUserData(), MainApi.getSavedMovies()])
        .then(([user, apiSavedMovies]) => {
          setCurrentUser(user);
          setSavedMovies(apiSavedMovies.filter((film) => film.owner === user._id));
        })
        .catch((err) => { setErrorMessage({ message: 'Произошла ошибка.', statusOk: false }); })
        .finally(() => {})
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => { 
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    } else setLoggedIn(false);
  }, [navigate]);

  function handleRegister(name, email, password) {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then(() => { handleLogin(email, password); })
      .catch((err) => { setErrorMessage({ message: 'Произошла ошибка.', statusOk: false }); })
      .finally(() => { setIsLoading(false); });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setErrorMessage({ message: 'Вы вошли в приложение.', statusOk: true });
      })
      .catch((err) => { setErrorMessage({ message: 'Произошла ошибка.', statusOk: false }); })
      .finally(() => { setIsLoading(false); });
  }

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    setIsLoading(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }}>
      <div className="app">
        <Routes>
          <Route element={ loggedIn ? <Navigate to='/movies' /> : <Login handleLogin={handleLogin} isLoading={isLoading} /> } path='/signin' />
          <Route element={ loggedIn ? <Navigate to='/movies' /> : <Register handleRegister={handleRegister} isLoading={isLoading} /> } path='/signup' />
          <Route element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} isOpen={isOpen} setIsOpen={setIsOpen} />
              <Movies />
              <Footer />
            </ProtectedRoute>
          }
          path='/movies' />
          <Route element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} isOpen={isOpen} setIsOpen={setIsOpen} />
              <SavedMovies />
              <Footer />
            </ ProtectedRoute>
          } path='/saved-movies' />
          <Route element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} isOpen={isOpen} setIsOpen={setIsOpen} />
              <Profile signOut={signOut} />
            </ ProtectedRoute>
            } path='/profile' />
          <Route element={
            <>
              <Header loggedIn={loggedIn} isOpen={isOpen} setIsOpen={setIsOpen} />
              <Main />
              <Footer />
            </>
            } exact path='/' />
          <Route element={ <NotFound /> } path='*' />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
