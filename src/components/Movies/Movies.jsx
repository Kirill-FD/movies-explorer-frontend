import { useCallback, useEffect, useState } from "react";
import { shorts__duration } from "../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import "./Movies.css";

function Movies({ setServerError, addMovie, deleteMovie, savedMovies }) {
  const [isCheck, setIsCheck] = useState(false);
  const [moviesFailed, setMoviesFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");

  const filter = useCallback((query, isCheck, movies) => {
    localStorage.setItem("query", JSON.stringify(query));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allMovies", JSON.stringify(movies));

    setSearchedMovie(query);
    const filtered = movies.filter((movie) => {
      const searchName = movie.nameRU
        .toLowerCase()
        .includes(query.toLowerCase());
      return isCheck ? searchName && movie.duration <= shorts__duration : searchName;
    });
    setFilterMovies(filtered);
  }, []);

  function searchMovies(query) {
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((res) => {
          setAllMovies(res);
          setIsCheck(false);
          filter(query, isCheck, res);
        })
        .catch((err) => {
          setMoviesFailed(true);
          console.error("Произошла ошибка на сервере: ", err);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(query, isCheck, allMovies);
    }
  }

  useEffect(() => {
    if (localStorage.query && localStorage.shorts && localStorage.allMovies) {
      const query = JSON.parse(localStorage.query);
      const isCheck = JSON.parse(localStorage.shorts);
      const movies = JSON.parse(localStorage.allMovies);
      setSearchedMovie(query);
      setIsCheck(isCheck);
      setAllMovies(movies);
      filter(query, isCheck, movies);
    }
  }, [filter, setServerError]);

  function toggleCheckbox() {
    if (isCheck) {
      setIsCheck(false);
      filter(searchedMovie, false, allMovies);
    } else {
      setIsCheck(true);
      filter(searchedMovie, true, allMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        savedMovies={savedMovies}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        setServerError={setServerError}
        isCheck={isCheck}
        toggleCheckbox={toggleCheckbox}
      />
      <MoviesCardList
        addMovie={addMovie}
        deleteMovie={deleteMovie}
        isLoading={isLoading}
        filterMovies={filterMovies}
        savedMovies={savedMovies}
        isSaved={false}
        moviesFailed={moviesFailed}
      />
    </main>
  );
}

export default Movies;
