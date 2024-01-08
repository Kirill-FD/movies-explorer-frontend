import { useCallback, useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({ savedMovie, onDelete, setIsError }) {

  const [foundMovie, setFoundMovie] = useState('')
  const [filterMovies, setFilterMovies] = useState(savedMovie)
  const [isCheck, setIsCheck] = useState(false)
  const [firstEnter, setFirstEnter] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setFoundMovie(search)
    setFilterMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return !isCheck ? searchName : (searchName && movie.duration <= 40)
    }))
  }, [])

  useEffect(() => {
    if (savedMovie.length === 0) {
      setFirstEnter(true)
    } else {
      setFirstEnter(false)
    }
    filter(foundMovie, isCheck, savedMovie)
  }, [filter, savedMovie, isCheck, foundMovie])

  function findMovies(search) {
    filter(search, isCheck, savedMovie)
    setFirstEnter(false)
  }

  return (
    <>
      <SearchInput
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        movies={savedMovie}
        filter={filter}
        findMovies={findMovies}
        foundMovie={foundMovie}
        setIsError={setIsError}
        firstEnter={firstEnter}
        savedMovie={savedMovie}
      />
      <MoviesCardList
        movies={filterMovies}
        onDelete={onDelete}
        firstEnter={firstEnter}
      />
    </>
  )
}