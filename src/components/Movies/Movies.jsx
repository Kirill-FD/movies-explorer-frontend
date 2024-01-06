import { useEffect, useCallback, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from '../../utils/MoviesApi';

export default function Movies({ addMovie, setIsError, savedMovies }) {
  const [allMovies, setAllMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])
  const [foundMovie, setFoundMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [firstEnter, setFirstEnter] = useState(true)

  const filter = useCallback((search, isCheck, movies) => {
    setFoundMovie(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isCheck))
    localStorage.setItem('allmovies', JSON.stringify(movies))
    setFilterMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function findMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res)
          setIsCheck(false)
          setServerError(false)
          setFirstEnter(false)
          filter(search, isCheck, res)
        })
        .catch(err => {
          setServerError(true)
          console.error(`Ошибка при поске фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filter(search, isCheck, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies)
      const search = JSON.parse(localStorage.movie)
      const isCheck = JSON.parse(localStorage.shorts)
      setServerError(false)
      setFirstEnter(false)
      setFoundMovie(search)
      setIsCheck(isCheck)
      setAllMovies(movies)
      filter(search, isCheck, movies)
    }
  }, [filter])

  return (
    <>
      <SearchInput
        isCheck={isCheck}
        setIsCheck={setIsCheck}
        movies={allMovies}
        filter={filter}
        findMovies={findMovies}
        foundMovie={foundMovie}
        setIsError={setIsError}
        firstEnter={firstEnter}
      />
      <MoviesCardList
        movies={filterMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
        firstEnter={firstEnter}
      />
    </>
  )
}