import "./FilterCheckbox.css";

function FilterCheckbox({ isCheck, toggleCheckbox }) {
  const firstEnter = !localStorage.getItem("allMovies");
  return (
    <form className="filter">
      <input
        className="filter__input"
        onChange={toggleCheckbox}
        checked={isCheck}
        disabled={firstEnter}
        type="checkbox"
      ></input>
      <span className="filter__title">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;