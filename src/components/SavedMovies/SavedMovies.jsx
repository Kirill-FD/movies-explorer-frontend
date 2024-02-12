import { useCallback, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, setServerError, deleteMovie }) {
  const [filterMovies, setFilterMovies] = useState(savedMovies);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const filter = useCallback((query, isCheck, movies) => {
    setSearchedMovie(query);
    setFilterMovies(
      movies.filter((movie) => {
        const searchName = movie.nameRU
          .toLowerCase()
          .includes(query.toLowerCase());
        return isCheck ? searchName && movie.duration <= 40 : searchName;
      })
    );
  }, []);

  function searchInSavedMovies(query) {
    filter(query, isCheck, savedMovies);
  }

  useEffect(() => {
    filter(searchedMovie, isCheck, savedMovies);
  }, [searchedMovie, isCheck, savedMovies, filter]);

  function toggleCheckbox() {
    if (isCheck) {
      setIsCheck(false);
      filter(searchedMovie, false, savedMovies);
    } else {
      setIsCheck(true);
      filter(searchedMovie, true, savedMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        toggleCheckbox={toggleCheckbox}
        searchMovies={searchInSavedMovies}
        searchedMovie={searchedMovie}
        savedMovies={savedMovies}
        setServerError={setServerError}
        isCheck={isCheck}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        isSaved={true}
        filterMovies={filterMovies}
        deleteMovie={deleteMovie}
      />
    </main>
  );
}

export default SavedMovies;
