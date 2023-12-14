import { Link } from 'react-router-dom'
import './Portfolio.css'
import Cover from '../Cover/Cover'

export default function Portfolio() {
  return (
    <section className='portfolio page__portfolio'>
      <Cover>
        <h2 className='portfolio__title'>Портфолио</h2>
        <nav className="portfolio__nav">
          <ul className='portfolio__lists'>
            <li className='portfolio__list'>
              <Link to={'https://github.com/Kirbro36/MyFirstProject'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Статичный сайт</p>
                <button className='portfolio__button' type='button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://kirbro36.github.io/russian-travel/'} target='_blank' className='portfolio__link'>
                <p className='portfolio__subtitle'>Адаптивный сайт</p>
                <button className='portfolio__button' type='button'></button>
              </Link>
            </li>
            <li className='portfolio__list'>
              <Link to={'https://kirbro69.nomoredomainsrocks.ru'} target='_blank' className='portfolio__link portfolio__link_type_last'>
                <p className='portfolio__subtitle'>Одностраничное приложение</p>
                <button className='portfolio__button' type='button'></button>
              </Link>
            </li>
          </ul>
        </nav>
      </Cover>
    </section>
  )
}