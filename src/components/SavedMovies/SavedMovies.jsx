import SearchInput from "../SearchInput/SearchInput";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";

export default function SavedMovies({ savedMovies, onDelete, setIsError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    setFirstEntrance(false)
    filter(search, isCheck, savedMovies)
  }

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    filter(searchedMovie, isCheck, savedMovies)
  }, [filter, savedMovies, isCheck, searchedMovie])

  return (
    <>
      <SearchInput
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        setIsError={setIsError}
        firstEntrance={firstEntrance}
        savedMovies={savedMovies}
        movies={savedMovies}
        filter={filter}
        setIsCheck={setIsCheck}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
        firstEntrance={firstEntrance}
      />
    </>
  )
}