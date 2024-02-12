import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useValidation from "../../hooks/useValidation";
import ErrorContext from "../../contexts/ErrorContext";
import "./SearchForm.css";

function SearchForm({
  savedMovies,
  searchMovies,
  searchedMovie,
  setServerError,
  isCheck,
  toggleCheckbox
}) {
  const { pathname } = useLocation();
  const { values, onChange, setValues } = useValidation();
  const serverError = useContext(ErrorContext);

  useEffect(() => {
    if (pathname === "/saved-movies" && savedMovies.length === 0) {
      setValues({ query: "" });
    } else {
      setValues({ query: searchedMovie });
    }
  }, [pathname, savedMovies, setValues, searchedMovie]);

  function handleSearch(e) {
    e.preventDefault();
    if (e.target.query.value) {
      searchMovies(e.target.query.value);
      setServerError("");
    } else {
      setServerError("Нужно ввести ключевое слово");
    }
  }

  return (
    <div className="search-form">
        <form
          className="search-form__container"
          id="form"
          onSubmit={handleSearch}
          noValidate
        >
          <input
            className="search-form__input"
            name="query"
            id="search-form"
            type="text"
            placeholder="Фильм"
            required
            onChange={(e) => {
              onChange(e);
              setServerError("");
            }}
            value={values.query || ""}
          ></input>
          <button className={`search-form__submit ${savedMovies && (pathname === "/saved-movies" && savedMovies.length === 0) ? "search-form__submit_disabled" : ''}`} type="submit" />
        </form>
        {serverError && (
          <span className="search-form__error">
            {serverError}
          </span>
        )}
      <label className="search__container-label">
        <FilterCheckbox isCheck={isCheck} toggleCheckbox={toggleCheckbox} />
      </label>
    </div>
  );
}

export default SearchForm;
