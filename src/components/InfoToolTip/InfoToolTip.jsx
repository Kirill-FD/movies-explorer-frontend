import './InfoToolTip.css';

function InfoTooltip(props) {
  const { isOpen, onClose, imagePath, title } = props;
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={imagePath}
          alt="картинка об операции"
        ></img>
        <h2 className="popup__title popup__title_type_success">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;