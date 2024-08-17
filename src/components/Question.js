import Options from "./Options";

export default function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h1>{question.question}</h1>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
