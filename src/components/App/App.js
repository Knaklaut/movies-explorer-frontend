import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={ <Login /> } path='/signin' />
        <Route element={ <Register /> } path='/signup' />
        <Route
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
          exact path='/'
        />
        <Route
          element={
            <>
              <Header />
              <Movies />
              <Footer />
            </>
          }
          exact path='/movies'
        />
        <Route
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
          exact path='/saved-movies'
        />
        <Route
          element={
            <>
              <Header />
              <Profile />
            </>
          }
          exact path='/profile'
        />
        <Route element={ <NotFound /> } path='*' />
      </Routes>
    </div>
  );
};

export default App;
