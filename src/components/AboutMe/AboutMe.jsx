import { Link } from "react-router-dom"
import photo from '../../images/photo.png'
import './AboutMe.css'

export default function AboutMe() {
    return (
        <section className="aboutme aboutme__page">
            <div className="aboutme__case">
                <h2 className="aboutme__title">Студент</h2>
                <div className="aboutme__container">
                    <div className="aboutme__text-container">
                        <h3 className="aboutme__name">Кирилл</h3>
                        <p className="aboutme__job">Фронтенд-разработчик, 29 лет</p>
                        <p className="aboutme__description">Я&nbsp;родился в&nbsp;Воронеже. Живу в&nbsp;Москве. Закончил экономический факультет ВГУИТ.
                            У&nbsp;меня есть две кошки породы Сфинкс. Веб-разработку я&nbsp;изучаю с&nbsp;2022&nbsp;года.
                            Начал работу в&nbsp;IT-сфере в&nbsp;качестве тестировщика. После окончания курса оформлю перевод на&nbsp;фронтенд разработчика.</p>
                        <Link to={'https://github.com/Kirbro36'} target='_blank' className="aboutme__link">Github</Link>
                    </div>
                    <img src={photo} alt="#" className="aboutme__image" />
                </div>
            </div>
        </section>
    )
}