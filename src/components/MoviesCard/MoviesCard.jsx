import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { convertDuration } from "../../utils/convertDuration";
import deleteMovieButton from "../../images/delete.svg";
import "./MoviesCard.css";

function MoviesCard({ data, isSaved, savedMovies, addMovie, deleteMovie }) {
  const [cardIsSaved, setCardIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      setCardIsSaved(savedMovies.some((movie) => data.id === movie.movieId));
    }
  }, [data.id, savedMovies, isSaved]);

  const handleSave = (e) => {
    e.preventDefault();
    if (savedMovies.some((movie) => data.id === movie.movieId)) {
      setCardIsSaved(true);
      deleteMovie(data);
    } else {
      setCardIsSaved(false);
      addMovie(data);
    }
  };

  return (
    <div className="card">
      <Link to={data.trailerLink} target="_blank">
        <div
          className="card__image"
          style={{
            backgroundImage: `url(${isSaved
              ? data.image
              : `https://api.nomoreparties.co${data.image.url}`
              })`,
          }}
        />
      </Link>
      <div className="card__container">
        <div className="card__block">
          <h3 className="card__title">{data.nameRU}</h3>
          <p className="card__duration">{convertDuration(data.duration)}</p>
        </div>
        {isSaved ? (
          <button
            type="button"
            onClick={() => deleteMovie(data)}
            className="card__delete"
          >
            <img
              src={deleteMovieButton}
              alt="кнопка удаления фильма"
            ></img>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className={`card__save-button ${cardIsSaved ? "card__save-button_active" : ""}`}
          >
          </button>
        )}
      </div>
    </div>
  );
}

export default MoviesCard;
