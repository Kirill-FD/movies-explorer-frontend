import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { convertTime } from '../../utils/utils'
import './MoviesCard.css'

export default function MoviesCard({ onDelete, addMovie, data, savedMovies }) {
  const location = useLocation()
  const [clickOn, setClickOn] = useState(false)

  useEffect(() => {
    if (location.pathname === '/movies')
      setClickOn(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, setClickOn, location])

  function handleClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClickOn(true)
      addMovie(data)
    } else {
      setClickOn(false)
      addMovie(data)
    }
  }

  return (
    <li className='gallery__card'>
      <article>
        <Link to={data.trailerLink} target='_blank'>
          <img src={location.pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className='gallery__image' />
        </Link>
        <div className='gallery__card-group'>
          <div className='gallery__text-group'>
            <p className='gallery__subtitle'>{data.nameRU}</p>
            <span className='gallery__duration'>{convertTime(data.duration)}</span>
          </div>
          {location.pathname === '/movies' ?
            <button type='button' className={`gallery__save ${clickOn ? 'gallery__save_active' : ''}`} onClick={handleClick}></button>
            :
            <button type='button' className={`gallery__save gallery__save_type_delete`} onClick={() => onDelete(data._id)}></button>
          }
        </div>
      </article>
    </li>
  )
}