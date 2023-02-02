import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { userNotification } from '../../utils/constants';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PopupForm from '../PopupForm/PopupForm';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NotFound from '../PageNotFound/PageNotFound';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupDetails, setPopupDetails] = useState({ message: '', isDataAccepted: false });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      MainApi.setToken();
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([me, apiSavedMovies]) => {
          setCurrentUser(me);
          setSavedMovies(apiSavedMovies.filter((film) => film.owner === me._id));
        })
        .catch(async (err) => {
          const { message } = await err.json();
          setPopupDetails({ message, isDataAccepted: false });
          setPopupOpen(true);
        })
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
      .then(() => {
        handleLogin(email, password);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        setPopupDetails({ message, isDataAccepted: false });
        setPopupOpen(true)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setPopupDetails({ message: userNotification.loginNotice, isDataAccepted: true });
        setPopupOpen(true);
      })
      .catch(async(err) => {
        const { message } = await err.json();
        setPopupDetails({ message, isDataAccepted: false });
        setPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function closeAllPopups() {
    setPopupOpen(false);
    setIsMenuOpen(false);
  };

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setIsLoading(false);
    setSavedMovies([]);
    closeAllPopups();
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }}>
      <div className='app'>
        <Routes>
          <Route
            element={ loggedIn ? <Navigate to='/movies' /> : <Login handleLogin={handleLogin} isLoading={isLoading} /> }
            path='/signin'
          />
          <Route
            element={ loggedIn ? <Navigate to='/movies' /> : <Register handleRegister={handleRegister} isLoading={isLoading} />}
            path='/signup'
          />
          <Route
            element={ 
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick} />
                <Movies />
                <Footer />
              </ProtectedRoute>
            }
            path='/movies'
          />
          <Route
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick} />
                <SavedMovies />
                <Footer />
              </ProtectedRoute>
            }
            path='/saved-movies'
          />
          <Route
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick} />
                <Profile signOut={signOut} setPopupDetails={setPopupDetails} setPopupOpen={setPopupOpen} />
              </ProtectedRoute>
            }
            path='/profile'
          />
          <Route
            element={
              <>
                <Header loggedIn={loggedIn} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleOverlayClick={handleOverlayClick} />
                <Main />
                <Footer />
              </>
            }
            exact path='/'
          />
          <Route
            element={<NotFound />}
            path='*'
          />
        </Routes>
        <PopupForm isOpen={isPopupOpen} popupDetails={popupDetails} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
