import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Profile from "./Profile/Profile.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import Movies from "./Movies/Movies.jsx";
import SavedMovies from "./SavedMovies/SavedMovies.jsx";
import Footer from "./Footer/Footer.jsx";
import Preloader from "./Preloaders/Preloader.jsx";
import Error from "./Error/Error.jsx";
import useValidation from "../hooks/useValidation.js";
import * as MainApi from "../utils/MainApi.js";
import InfoTooltip from "./InfoToolTip/InfoToolTip.jsx";
import success from "../images/success.svg";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ErrorContext from "../contexts/ErrorContext.js";
import SendContext from "../contexts/SendContext.js";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSuccessEditPopupOpen, setisSuccessEditPopupOpen] = useState(false);
  const [isSuccessRegisterPopupOpen, setSuccessRegisterPopupOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const { values, setValues, errors, onChange, isValid } = useValidation();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      Promise.all([MainApi.getUserData(token), MainApi.getMovies(token)])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData.reverse());
          setLoggedIn(true);
          setIsCheckToken(false);
        })
        .catch((err) => {
          console.log(err);
          setIsCheckToken(false);
        });
    } else {
      setLoggedIn(false);
      setIsCheckToken(false);
    }
  }, [loggedIn]);

  const openPopupRegisterSuccess = () => {
    setSuccessRegisterPopupOpen("popup_opened");
    setTimeout(() => {
      setSuccessRegisterPopupOpen(false);
    }, 1200);
  };

  const openPopupEditSuccess = () => {
    setisSuccessEditPopupOpen("popup_opened");
    setTimeout(() => {
      setisSuccessEditPopupOpen(false);
    }, 1200);
  };

  const closeAllPopups = () => {
    setSuccessRegisterPopupOpen(false);
    setisSuccessEditPopupOpen(false);
  };

  function handleRegister(e) {
    e.preventDefault();
    setIsSend(true);
    MainApi.register(values.name, values.email, values.password)
      .then((res) => {
        openPopupRegisterSuccess();
        MainApi.authorize(values.email, values.password)
          .then((data) => {
            localStorage.setItem("jwt", data.token);
            setValues({ email: "", password: "" });
            setLoggedIn(true);
            navigate("/movies", { replace: true });
          })
          .catch((err) => {
            setServerError("Произошла ошибка при авторизации");
            console.log(err);
          })
          .finally(() => setIsSend(false));
      })
      .catch((err) => {
        setServerError("Произошла ошибка при регистрации");
        console.log(err);
      })
      .finally(() => setIsSend(false));
  }

  function handleLogin(e) {
    e.preventDefault();
    setIsSend(true);
    MainApi.authorize(values.email, values.password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setValues({ email: "", password: "" });
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setServerError("Неправильный логин или пароль");
        console.log(err);
      })
      .finally(() => setIsSend(false));
  }

  function onLogout() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  const showFooter = () => {
    return (
      pathname === "/" || pathname === "/movies" || pathname === "/saved-movies"
    );
  };

  function onEditProfile(name, email) {
    setIsSend(true)
    MainApi.editUserData(name, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        openPopupEditSuccess()
        setIsEdit(false)
      })
      .catch((err) => {
        setServerError("Ошибка при редактировании профиля");
        console.log(err);
      })
      .finally(() => setIsSend(false));
  }

  function handleAddMovie(data) {
    const token = localStorage.getItem("jwt");
    MainApi.addMovie(data, token)
      .then((res) => setSavedMovies([res, ...savedMovies]))
      .catch((err) => console.error("Ошибка при нажитии на кнопку", err));
  }

  function handleDeleteMovie(data) {
    const token = localStorage.getItem("jwt");
    let movieToDelete;
    if (pathname === "/movies") {
      movieToDelete = savedMovies.filter((item) => item.movieId === data.id);
    } else {
      movieToDelete = savedMovies.filter(
        (item) => item.movieId === data.movieId
      );
    }
    MainApi.deleteMovie(movieToDelete[0]._id, token)
      .then(() => {
        if (pathname === "/movies") {
          setSavedMovies(
            savedMovies.filter((movie) => {
              return movie.movieId !== data.id;
            })
          );
        } else {
          setSavedMovies(
            savedMovies.filter((movie) => {
              return movie._id !== data._id;
            })
          );
        }
      })
      .catch((err) =>
        console.error("При удалении фильма произошла ошибка", err)
      );
  }

  return (
    <>
      {isCheckToken ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <ErrorContext.Provider value={serverError}>
            <SendContext.Provider value={isSend}>
              <div className="page">
                <div className="page__content">
                  <Header loggedIn={loggedIn} />
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                      path="/movies"
                      element={
                        <ProtectedRoute
                          element={Movies}
                          loggedIn={loggedIn}
                          isSaved={false}
                          savedMovies={savedMovies}
                          addMovie={handleAddMovie}
                          deleteMovie={handleDeleteMovie}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/saved-movies"
                      element={
                        <ProtectedRoute
                          element={SavedMovies}
                          loggedIn={loggedIn}
                          isSaved={true}
                          savedMovies={savedMovies}
                          deleteMovie={handleDeleteMovie}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <Profile
                          isEdit={isEdit}
                          onLogout={onLogout}
                          setIsEdit={setIsEdit}
                          onEditProfile={onEditProfile}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/signup"
                      element={
                        <Register
                          isSend={isSend}
                          values={values}
                          errors={errors}
                          isValid={isValid}
                          onChange={onChange}
                          handleRegister={handleRegister}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route
                      path="/signin"
                      element={
                        <Login
                          isSend={isSend}
                          errors={errors}
                          values={values}
                          isValid={isValid}
                          handleLogin={handleLogin}
                          onChange={onChange}
                          setServerError={setServerError}
                        />
                      }
                    />
                    <Route path="*" element={<Error />} />
                  </Routes>
                  {showFooter() && <Footer />}
                  <InfoTooltip
                    isOpen={isSuccessRegisterPopupOpen}
                    onClose={closeAllPopups}
                    imagePath={success}
                    title="Вы успешно зарегистрировались!"
                  />
                  <InfoTooltip
                    isOpen={isSuccessEditPopupOpen}
                    onClose={closeAllPopups}
                    imagePath={success}
                    title="Редактирование успешно!"
                  />
                </div>
              </div>
            </SendContext.Provider>
          </ErrorContext.Provider>
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
