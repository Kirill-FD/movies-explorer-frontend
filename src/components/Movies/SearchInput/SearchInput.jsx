import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import CheckBox from '../CheckBox/CheckBox'
import ErrorContext from '../../../contexts/ErrorContext'
import useFormValidation from '../../../utils/useFormValidation'
import './SearchInput.css'

export default function SearchInput({
  isCheck,
  setIsCheck,
  movies,
  filter,
  foundMovie,
  findMovies,
  setIsError,
  firstEnter,
  savedMovie }) {

  const { values, handleChange, reset } = useFormValidation()
  const location = useLocation()
  const errorContext = useContext(ErrorContext)

  useEffect(() => {
    if (
      location.pathname === '/saved-movies' &&
      savedMovie.length === 0
    ) {
      reset({ search: '' })
    } else {
      reset({ search: foundMovie })
    }
    setIsError(false)
  }, [foundMovie, savedMovie, reset, location, setIsError])

  function handleFilterShorts() {
    if (!isCheck) {
      filter(values.search, true, movies)
      setIsCheck(true)
    } else {
      filter(values.search, false, movies)
      setIsCheck(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!event.target.search.value) {
      setIsError(true)
    } else {
      findMovies(event.target.search.value)
      setIsError(false)
    }
  }

  return (
    <section className='search search__page'>
      <div className='search__container'>
        <form className='search__form' name={'SearchInput'} onSubmit={handleSubmit} noValidate >
          <input
            required
            type='text'
            name='search'
            placeholder='Фильм'
            className='search__input'
            value={values.search || ''}
            onChange={handleChange}
          />
          <button name='button' type='submit' className='search__submit'></button>
        </form>
        <span className={`search__error ${!errorContext ? '' : 'search__error_active'}`}>{'Введите ключевое слово'}</span>
      </div>
      <label className={`search__container-label ${firstEnter && 'search__container-label_disabled'}`}>
        <CheckBox isCheck={isCheck} firstEnter={firstEnter} handleFilterShorts={handleFilterShorts} />
      </label>
    </section>
  )
}