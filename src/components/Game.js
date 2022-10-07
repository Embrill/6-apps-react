import React from 'react'

const Game = ({ question, questions, onClickVariant, step }) => {
    // Высчитывание процентов
    const percentage = Math.round(step / questions.length * 100);

    return (
        <>
            <div className="progress">
                <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {
                    question.variants.map((el, index) => {
                        return (
                            <li key={el}
                                onClick={() => onClickVariant(index)}>
                                {el}
                            </li>)
                    })
                }
            </ul>
        </>
    );
}

export default Game
