import {  useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import mainApi from '../utils/MainApi.js';
import SendContext from '../contexts/SendContext';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ErrorContext from '../contexts/ErrorContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedPage from './ProtectedPage/ProtectedPage';
import Preloader from './Preloader/Preloader';
import './App.css';

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserData(localStorage.jwt), 
        mainApi.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [loggedIn])

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  function handleDeleteMovie(deletemovieId) {
    mainApi.removeMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleToggleMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  function handleLogin(email, password) {
    setIsSend(true)
    mainApi.auth(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(username, email, password) {
    setIsSend(true)
    mainApi.registr(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          mainApi.auth(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
            })
            .catch((err) => {
              setIsError(true)
              console.error(`Ошибка при авторизации после регистрации ${err}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function editUserData(username, email) {
    setIsSend(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="page__container">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>

                <Route path='/signin' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signin' onLogin={handleLogin} setIsError={setIsError} />
                } />

                <Route path='/signup' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signup' onRegister={handleRegister} setIsError={setIsError} />
                } />

                <Route path='/profile' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='profile'
                  loggedIn={loggedIn}
                  logOut={logOut}
                  editUserData={editUserData}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                />
                } />

                <Route path='/' element={
                  <>
                    <Header name='home' loggedIn={loggedIn} />
                    <Main name='home' />
                    <Footer />
                  </>
                } />

                <Route path='/movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='movies'
                  savedMovies={savedMovies}
                  addMovie={handleToggleMovie}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path='/saved-movies' element={<ProtectedRoute
                   element={ProtectedPage}
                   name='savedmovies'
                   onDelete={handleDeleteMovie}
                   savedMovies={savedMovies}
                   loggedIn={loggedIn}
                   setIsError={setIsError}
                />
                } />

                <Route path='*' element={
                  <>
                    <Main name='error' />
                  </>
                } />

              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      }
    </div>
  );
}

export default App;