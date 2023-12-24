import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation'
import CheckBox from '../CheckBox/CheckBox'
import ErrorContext from '../../contexts/ErrorContext'
import './SearchInput.css'

export default function SearchInput({ isCheck, searchedMovie, searchMovies, setIsError, firstEntrance, savedMovies, movies, filter, setIsCheck }) {

  const { pathname } = useLocation()
  const isError = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [searchedMovie, reset, setIsError, pathname, savedMovies])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(values.search, false, movies)
    } else {
      setIsCheck(true)
      filter(values.search, true, movies)
    }
  }

  return (
    <section className='search search__page'>
      <div className='search__container'>
        <form noValidate className='search__form' name={'SearchInput'} onSubmit={onSubmit}>
          <input
            type="text"
            name='search'
            placeholder='Фильм'
            className='search__input'
            required
            value={values.search || ''}
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            disabled={savedMovies ? (savedMovies.length === 0 && true) : false}
          />
          <button type='submit' className={`search__submit ${savedMovies ? (pathname === '/saved-movies' && savedMovies.length === 0) && 'search__submit_disabled' : ''}`}></button>
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>{'Введите ключевое слово'}</span>
        <CheckBox isCheck={isCheck} changeShort={changeShort} firstEntrance={firstEntrance} />
      </div>
    </section>
  )
}