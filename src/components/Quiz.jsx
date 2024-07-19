import React, { useState } from "react";
import PropTypes from "prop-types";
import Question from "./Questions";
import Timer from "./Timer";
import questions from "../data/questions.json";
import "./Quiz.css";

const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const questionsPerPage = 5;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setUserAnswers((prevAnswers) => {
                const answers = prevAnswers[name] || [];
                if (checked) {
                    return { ...prevAnswers, [name]: [...answers, value] };
                } else {
                    return { ...prevAnswers, [name]: answers.filter((answer) => answer !== value) };
                }
            });
        } else {
            setUserAnswers({ ...userAnswers, [name]: value });
        }
    };

    const handleNext = () => {
        if (currentPage === Math.ceil(questions.length / questionsPerPage)) {
            calculateScore();
            setQuizCompleted(true);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleStartQuiz = () => {
        setCurrentPage(1);
    };

    const handleRetakeQuiz = () => {
        setUserAnswers({});
        setScore(0);
        setQuizCompleted(false);
        setCurrentPage(1);
    };

    const arraysEqual = (arr1, arr2) => {
        if (!arr1 || !arr2.length) return false;
        if (arr1.length !== arr2.length) return false;
        let sortedArr1 = arr1.slice().sort();
        let sortedArr2 = arr2.slice().sort();
        for (let i = 0; i < sortedArr1.length; i++) {
            if (sortedArr1[i] !== sortedArr2[i]) return false;
        }
        return true;
    };

    const calculateScore = () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[`q${index + 1}`];
            if (question.type == "checkbox") {
                if (arraysEqual(userAnswer, question.answer)) {
                    totalScore += 1;
                }
            } else if (String(userAnswer).toLowerCase() == String(question.answer[0]).toLowerCase()) {
                totalScore += 1;
            } else {
                console.log("No Answer");
            }
        });
        setScore(totalScore);
    };

    if (quizCompleted) {
        return (
            <div className="quiz">
                <h2>
                    Your score is: {score}/{questions.length}
                </h2>
                <button onClick={handleRetakeQuiz}>Retake Quiz</button>
            </div>
        );
    }

    if (currentPage === 0) {
        return (
            <div className="quiz">
                <h1>Welcome to the Cosmology Quiz</h1>
                <button onClick={handleStartQuiz}>Start Quiz</button>
            </div>
        );
    }

    const currentQuestions = questions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);
    const totalPages = Math.ceil(questions.length / questionsPerPage);

    return (
        <div className="quiz">
            <Timer duration={300} onTimeUp={handleNext} />
            <div className="questions_container">
                <div className="page-indicator">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <span key={i} className={i + 1 === currentPage ? "active" : ""}>
                            •
                        </span>
                    ))}
                </div>
                <form>
                    {currentQuestions.map((question, index) => (
                        <Question
                            key={index}
                            question={question}
                            index={index + (currentPage - 1) * questionsPerPage + 1}
                            handleChange={handleChange}
                            userAnswers={userAnswers}
                        />
                    ))}
                    <div className="pagination">
                        {currentPage > 1 && (
                            <button type="button" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        <button type="button" onClick={handleNext}>
                            {currentPage === totalPages ? "Submit" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Quiz.propTypes = {
    duration: PropTypes.number,
    onTimeUp: PropTypes.func,
};

export default Quiz;
