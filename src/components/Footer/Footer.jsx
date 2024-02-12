import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
            <div className="footer__container">
                <div className="footer__copyright">© 2024</div>
                <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                <a className="footer__link" href="https://github.com/Kirbro36" target="_blank" rel="noreferrer">Github</a>
            </div>
        </footer>
    )
}

export default Footer;
