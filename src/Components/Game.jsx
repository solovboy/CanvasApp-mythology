import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import data from "../Content/questions"
import { Badge, Button } from "@salutejs/plasma-ui";

const Game = React.forwardRef((props, ref) => {

    const location = useLocation();
    const navigate = useNavigate();
    const type = location.state.Type;



    let gameClass = "";
    let header = "";
    let questions = [];

    switch (type) {
        case 1:
            gameClass = "scandinavia"
            header = "Скандинавии";
            questions = data.scn.questions;
            break
        case 2:
            gameClass = "greece"
            header = "Греции"
            questions = data.gre.questions;
            break
        case 3:
            gameClass = "egypt"
            header = "Египта"
            questions = data.egpt.questions;
            break
        default:
            break
    }

    if (questions.length == 0) {
        navigate('/');
    }

    const [currentQuestIdx, setCurrentQuietIdx] = useState(0)
    const [currentQuest, setCurrentQuiet] = useState(questions[0])
    const [wrongAnswer, setWrongAnswer] = useState(null)
    const [currentAnswer, setCurrentAnswer] = useState(null)
    const [currentAnswersCount, setCountAnswersCount] = useState(0)
    const [gameState, setGameState] = useState("game");

    const callMethod = (methodName, num) => {
        switch (methodName) {
            case 'next':
                nextQuestion();
                break;
            case 'ans':
                checkAnswer(num);
                break;
            default:
                break;
        }
    };

    React.useImperativeHandle(ref, () => {
        return {
            callMethod
        }
    });



    function nextQuestion() {
        let newIdx = currentQuestIdx + 1
        setCurrentQuietIdx(newIdx)
        setCurrentQuiet(questions[newIdx])
        setWrongAnswer(null)
        setCurrentAnswer(null)
    }

    function checkAnswer(num) {
        if (currentQuest.validAnswer == num) {
            setCurrentAnswer(num);
            setWrongAnswer(null);
            setCountAnswersCount(x => x + 1);
        }
        else {
            setCurrentAnswer(currentQuest.validAnswer);
            setWrongAnswer(num)
        }

        if (currentQuestIdx == questions.length - 1) {
            setGameState("results")
        }

    }

    function getComment() {
        if (currentAnswersCount < 6) {
            return "Не стоит огорчаться, если результат небольшой. Это отличный повод изучить тему еще более тщательно!"
        }
        else if (currentAnswersCount < 11) {
            return "Вы проявили неплохие знания, но есть еще, что можно изучить. Продолжайте узнавать новое!"
        }
        else if (currentAnswersCount < 15) {
            return "Вы хорошо знаете мифологию, но есть несколько ошибок. Попробуйте еще раз!"
        }
        else {
            return "Безупречный результат! Вы отлично разбираетесь в мифологии!"
        }
    }

    function toMenu() {
        navigate('/');
    }



    return (
        <div className={"game " + gameClass} >
            <div className="question-block">
                <h1 style={{ margin: "0" }}>{"Мифология " + header}</h1>

                {gameState == "game" ?
                    <>
                        <h3 style={{ textAlign: "center" }}>{currentQuest.question}</h3>
                        <div className="answers">
                            <div>
                                <Button view="secondary" onClick={() => checkAnswer(1)} className={"answer " + (wrongAnswer == 1 ? "incorrect " : "") +
                                    (currentAnswer == "1" ? "correct" : "")}>
                                    <Badge text="1" size="l" />
                                    <div className="answer-text">
                                        {currentQuest.answers[0]}
                                    </div>
                                </Button>
                                <Button view="secondary" onClick={() => checkAnswer(2)} className={"answer " + (wrongAnswer == 2 ? "incorrect " : "") +
                                    (currentAnswer == 2 ? "correct" : "")}>
                                    <Badge text="2" size="l" />
                                    <div className="answer-text">
                                        {currentQuest.answers[1]}
                                    </div>
                                </Button>
                                <Button view="secondary" onClick={() => checkAnswer(3)} className={"answer " + (wrongAnswer == 3 ? "incorrect " : "") +
                                    (currentAnswer == 3 ? "correct" : "")}>
                                    <Badge text="3" size="l" />
                                    <div className="answer-text">
                                        {currentQuest.answers[2]}
                                    </div>
                                </Button>
                                <Button view="secondary" onClick={() => checkAnswer(4)} className={"answer " + (wrongAnswer == 4 ? "incorrect " : "") +
                                    (currentAnswer == 4 ? "correct" : "")}>
                                    <Badge text="4" size="l" />
                                    <div className="answer-text">
                                        {currentQuest.answers[3]}
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Button size="m" view="primary" onClick={nextQuestion} disabled={currentAnswer == null}>Следующий вопрос</Button>
                            <Button size="m" view="secondary" onClick={toMenu} >Список тем</Button>
                        </div>
                    </>
                    :
                    <div className="results-block">
                        <p className="results-comment">{getComment()}</p>
                        <p className="results-comment">Верных ответов</p>
                        <p className="corr-ans-count">{currentAnswersCount + " из " + questions.length}</p>
                        <Button size="l" view="primary" onClick={toMenu}>Играть снова</Button>
                    </div>
                }

            </div>


        </div >
    )
})

export default Game;