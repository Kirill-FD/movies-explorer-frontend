import { useNavigate, Link } from "react-router-dom";
import './Error.css';

function Error() {
  const navigate = useNavigate();

  return (
    <section className="not-found-page">
      <div className='not-found-page__container'>
        <h2 className="not-found-page__title">404</h2>
        <p className="not-found-page__text">Страница не найдена</p>
        <Link type="button" className="not-found-page__button" onClick={() => navigate(-1)} >Назад</Link>
      </div>
    </section>
  );
}

export default Error;