import React from "react";
import PropTypes from "prop-types";
import "../styles/Questions.css";

const Question = ({ question, index, handleChange, userAnswers }) => {
    const renderOptions = (options, name, type) => {
        return options.map((option, idx) => (
            <label key={idx} className="option-label">
                <input
                    type={type}
                    name={name}
                    value={option}
                    checked={userAnswers[name]?.includes(option) || false}
                    onChange={handleChange}
                />
                {option}
            </label>
        ));
    };

    return (
        <div className="question">
            <p>
                <strong>Q{index}:</strong> {question.question}
            </p>
            {question.type === "text" && (
                <input type="text" name={`q${index}`} value={userAnswers[`q${index}`] || ""} onChange={handleChange} />
            )}
            {question.type === "radio" && renderOptions(question.options, `q${index}`, "radio")}
            {question.type === "checkbox" && renderOptions(question.options, `q${index}`, "checkbox")}
            {question.type === "dropdown" && (
                <select name={`q${index}`} value={userAnswers[`q${index}`] || ""} onChange={handleChange}>
                    <option value="">Select an option</option>
                    {question.options.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
        answer: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    userAnswers: PropTypes.object.isRequired,
};

export default Question;
