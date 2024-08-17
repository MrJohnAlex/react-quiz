export default function Options({ question, dispatch, answer }) {
  return (
    <div className="option">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-ui ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === question.answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "answer", payload: index })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
