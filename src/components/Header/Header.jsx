import { React, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import profileBlack from "../../images/profile-black.svg";
import profileGreen from "../../images/profile-green.svg";
import burgerBlack from "../../images/burger-black.svg";
import burgerGreen from "../../images/burger-green.svg";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function HeaderLoggedIn({ isMain }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOpenBurgerMenu() {
    setIsClicked(true);
  }

  const handleCloseBurgerMenu = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleCloseBurgerMenu();
      }
    };
    if (isClicked) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isClicked]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseBurgerMenu();
    }
  };

  return (
    <header className={isMain ? "header" : "header header_color"}>
      <nav className="header__buttons-container header__buttons-container_loggedIn">
        <Link to="/" className="logo">
          <img src={logo} alt="логотип сайта" />
        </Link>
        <div className="header__movies-buttons">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `header__button header__button_loggedIn ${isActive ? "header__button_active" : ""
              }`
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              `header__button header__button_loggedIn ${isActive ? "header__button_active" : ""
              }`
            }
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to="/profile" className="header__button header__button_loggedIn">
          <img
            src={isMain ? profileGreen : profileBlack}
            className="header__profile-icon"
            alt="Иконка аккаунта"
          />
        </Link>
        <button
          type="button"
          className="header__burger-menu-button"
          onClick={handleOpenBurgerMenu}
        >
          <img
            src={isMain ? burgerGreen : burgerBlack}
            alt="меню открытия навигации"
          ></img>
        </button>
      </nav>
      {isClicked ? (
        <Navigation onClose={handleCloseBurgerMenu} onClick={handleOverlay} />
      ) : (
        ""
      )}
    </header>
  );
}

function HeaderDefault() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="логотип сайта" />
      </Link>
      <div className="header__enter-container">
        <Link to="/signup" className="header__button">
          Регистрация
        </Link>
        <Link to="/signin" className="header__button header__button-green">
          Войти
        </Link>
      </div>
    </header>
  );
}

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  if (loggedIn) {
    if (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    ) {
      return <HeaderLoggedIn isMain={false} />;
    } else if (pathname === "/") {
      return <HeaderLoggedIn isMain={true} />;
    }
  } else {
    if (pathname === "/signin" || pathname === "/signup") {
      return null;
    }
  }

  if (
    pathname !== "/movies" &&
    pathname !== "/saved-movies" &&
    pathname !== "/profile" &&
    pathname !== "/" &&
    pathname !== "/signin" &&
    pathname !== "/signup"
  ) {
    return null;
  }

  return <HeaderDefault />;
}

export default Header;