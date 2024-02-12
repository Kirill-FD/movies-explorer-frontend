import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import PreloaderBlock from "../Preloaders/PreloaderBlock";
import { classNames } from "../../utils/classNames";
import {
  screenMax,
  screenMedium,
  screenSmall,
  maxScreenInit,
  lessScreenInit,
  mediumScreenInit,
  smallScreenInit,
  maxScreenStep,
  mediumScreenStep,
  smallScreenStep
} from "../../utils/constants";
import "./MoviesCardList.css";

function MoviesCardList({
  isSaved,
  addMovie,
  deleteMovie,
  isLoading,
  moviesFailed,
  filterMovies,
  savedMovies,
}) {
  const [count, setCount] = useState(maxScreenInit);
  const moviesToShow = filterMovies.slice(0, count);
  const firstTime = !localStorage.getItem("allMovies");

  function counterCards() {
    const counter = { init: maxScreenInit, step: maxScreenStep };
    if (window.innerWidth < screenMax) {
      counter.init = lessScreenInit;
      counter.step = mediumScreenStep;
    }
    if (window.innerWidth < screenMedium) {
      counter.init = mediumScreenInit;
      counter.step = smallScreenStep;
    }
    if (window.innerWidth < screenSmall) {
      counter.init = smallScreenInit;
      counter.step = smallScreenStep;
    }
    return counter;
  }

  function clickMore() {
    setCount(count + counterCards().step);
  }

  useEffect(() => {
    if (!isSaved) {
      function counterCardsForResize() {
        setCount(counterCards().init);
      }
      window.addEventListener("resize", counterCardsForResize);
      return () => {
        window.removeEventListener("resize", counterCardsForResize);
      };
    }
  }, [isSaved]);

  function CardListContent() {
    const movieList =
      isSaved && filterMovies.length !== 0 ? filterMovies : moviesToShow;

    if (isLoading) {
      return <PreloaderBlock />;
    }
    if (firstTime) {
      return (
        <p className="cards__no-saved-movies">
          Чтобы увидеть список фильмов выполните поиск
        </p>
      );
    }

    if (moviesFailed) {
      return (
        <p className="cards__no-saved-movies">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      );
    }
    if (isSaved && filterMovies.length === 0) {
      return (
        <p className="cards__no-saved-movies">Нет сохраненных фильмов</p>
      );
    }

    if (!firstTime && filterMovies.length === 0) {
      return <p className="cards__no-saved-movies">Ничего не найдено</p>;
    }

    return movieList.map((item) => (
      <li className="cards__item" key={!isSaved ? item.id : item._id}>
        <MoviesCard
          data={item}
          isSaved={isSaved}
          savedMovies={savedMovies}
          addMovie={isSaved ? undefined : addMovie}
          deleteMovie={deleteMovie}
        />
      </li>
    ));
  }

  return (
    <section
      className={classNames({
        cards: true,
        cards_isSaved: isSaved,
        centered: moviesToShow.length === 0 || isLoading,
      })}
    >
      <ul className="cards__list">
        <CardListContent />
      </ul>
      {isSaved ? null : (
        <button
          type="button"
          onClick={clickMore}
          className={`cards__button-more ${count >= filterMovies.length && "cards__button-more_hidden"}`}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
