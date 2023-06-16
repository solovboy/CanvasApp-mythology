import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function QuizStart() {
    const navigate = useNavigate();

    const location = useLocation();

    if (location.state == null) {
        toMenu();
    }

    let type = null;

    if (location.state) {
        type = location.state.Type
    }

    function toMenu() {
        navigate('/');
    }

    function toGame() {
        navigate("/game", { state: { Type: type } });
    }

    return (
        <div className="quiz-start">
            <div>
                <h1 className="quiz-text">Готовы ли вы отправиться в увлекательное путешествие по миру древней мифологии и проверить свои знания о богах, героях и монстрах?</h1>
                <h1 className="quiz-text">Для вас мы подготовили 15 вопросов по выбранной мифологии. Начнем?</h1>
                <button className="menu-btn" onClick={toGame}>Начать</button>
                <button className="menu-btn" onClick={toMenu}>Вернуться</button>
            </div>
        </div>
    )
}

export default QuizStart;