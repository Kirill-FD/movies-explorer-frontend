import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { printCards } from '../../utils/utils'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import './MoviesCardList.css'

export default function MoviesCardList({ movies, addMovie, savedMovies, firstEnter, isLoading, serverError, onDelete }) {

  const location = useLocation()
  const [count, setCount] = useState('')
  const factCount = movies.slice(0, count)

  useEffect(() => {
    if (location.pathname === '/movies') {
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= 1020) {
          setCount(printCards().init)
        }
        if (window.innerWidth < 1020) {
          setCount(printCards().init)
        }
        if (window.innerWidth < 650) {
          setCount(printCards().init)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [location, movies])

  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className='gallery gallery__page'>
      <ul className='gallery__lists'>
        {isLoading ? <Preloader /> :
          (location.pathname === '/movies' && factCount.length !== 0) ?
            factCount.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : serverError ?
                <span className='gallery__search-error'>Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз
                </span>
                : !firstEnter ?
                  <span className='gallery__search-error'>Ничего не найдено</span>
                  : location.pathname === '/movies' ?
                    <span className='gallery__search-error'>Чтобы увидеть список фильмов выполните поиск</span>
                    :
                    <span className='gallery__search-error'>Нет сохранённых фильмов</span>
        }
      </ul>
      {location.pathname === '/movies' && <button type='button' className={`gallery__more ${count >= movies.length && 'gallery__more_hidden'}`} onClick={clickMore}>Ёще</button>}
    </section>
  )
}