import { useContext } from "react";
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/constants";
import logo from "../../images/logo.svg";
import ErrorContext from "../../contexts/ErrorContext";
import SendContext from "../../contexts/SendContext";
import PreloaderButton from "../Preloaders/PreloaderButton";
import "./Form.css";

function Form({
  isRegister,
  title,
  values,
  errors,
  submitText,
  link,
  formText,
  linkText,
  submitButtonLogin,
  onSubmit,
  onChange,
  isValid,
  setServerError
}) {
  const serverError = useContext(ErrorContext);
  const isSend = useContext(SendContext)

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <Link to="/"><img className="form__logo" src={logo} alt="Логотип сайта"></img></Link>
      <h2 className="form__title">{title}</h2>
      {isRegister ? (
        <label className="form__label">Имя
          <input
            className="form__input"
            id="name"
            name="name"
            placeholder="Введите имя"
            disabled={isSend}
            onChange={(e) => {
              onChange(e);
              setServerError("");
            }}
            value={values.name || ""}
            required
          />
          <span className="form__input-error">{errors.name || ""}</span>
        </label>
      ) : (
        ""
      )}
      <label className="form__label">E-mail
        <input
          className="form__input"
          id="email"
          name="email"
          type="email"
          placeholder="Введите E-mail"
          required
          disabled={isSend}
          onChange={(e) => {
            onChange(e);
            setServerError("");
          }}
          value={values.email || ""}
          pattern={EMAIL_REGEX}
        />
        <span className="form__input-error">{errors.email || ""}</span>
      </label>
      <label className="form__label">Пароль
        <input
          className="form__input"
          id="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          required
          disabled={isSend}
          onChange={(e) => {
            onChange(e);
            setServerError("");
          }}
          value={values.password || ""}
        ></input>
        <span className="form__input-error form__input-error_active">
          {errors.password || ""}
        </span>
      </label>
      <span className={`form__server-error ${submitButtonLogin}`}>{serverError || ""}</span>
      <button
        type="submit"
        disabled={!isValid || isSend}
        className={`form__submit-button ${!isValid || isSend ? "form__submit-button-inactive" : ""
          }`}
      >{isSend ? <PreloaderButton /> : submitText}
      </button>
      <div className="form__subtitle">
        <p className="form__subtitle-text">{formText}</p>
        <Link to={link} className="form__subtitle-link">{linkText}</Link>
      </div>
    </form>
  );
}

export default Form;
