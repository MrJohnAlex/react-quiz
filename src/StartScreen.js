export default function StartScreen({ questions, dispatch }) {
  return (
    <div className="start">
      <h1>Start Screen</h1>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button onClick={() => dispatch({ type: "start" })}>Let's start</button>
    </div>
  );
}
