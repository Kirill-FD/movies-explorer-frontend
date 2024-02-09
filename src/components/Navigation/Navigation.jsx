import { NavLink } from "react-router-dom";
import profileDark from "../../images/profile-black.svg";
import "./Navigation.css";

function Navigation({ onClose, onClick }) {
  return (
    <section className="navigate">
      <div className="navigate__overlay" onClick={onClick}>
        <div className="navigate__menu">
          <button
            type="button"
            className="navigate__close-button"
            onClick={onClose}
          ></button>
          <nav className="navigate__links">
            <div className="navigate__buttons">
              <NavLink exact="true" to="/"
                className={({ isActive }) =>
                  `navigate__button ${isActive ? "navigate__button_active" : ""}`}>
                Главная
              </NavLink>
              <NavLink exact="true" to="/movies"
                className={({ isActive }) =>
                  `navigate__button ${isActive ? "navigate__button_active" : ""}`}>
                Фильмы
              </NavLink>
              <NavLink exact="true" to="/saved-movies"
                className={({ isActive }) =>
                  `navigate__button ${isActive ? "navigate__button_active" : ""}`}>
                Сохранённые фильмы
              </NavLink>
            </div>
            <div className="navigate__profile">
              <NavLink exact="true" to="/profile">
                <img src={profileDark} alt="Иконка аккаунта" />
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Navigation;