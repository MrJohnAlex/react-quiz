import Header from "./Header";
import "../App.css";
import Main from "./Main.jsx";
import { useEffect, useReducer } from "react";
import Loader from "./Loading.jsx";
import Error from "./Error.jsx";
import StartScreen from "../StartScreen.js";
import Question from "./Question.js";
import NextQuestion from "./NextQuestion.js";
import Progress from "./Progress.js";
import FinishedScreen from "./FinishedScreen.js";
import Timer from "./Timer.js";

const SEC_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  score: 0,
  hightScore: 0,
  secRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "finished":
      return { ...state, questions: action.payload, status: "Loaded" };
    case "start":
      return {
        ...state,
        status: "active",
        secRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.answer
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        hightScore:
          state.score > state.hightScore ? state.score : state.hightScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
      };
    case "start_timer":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? "finished" : state.status,
      };
    case "error":
      return { ...state, status: "Error" };
    default:
      throw new Error("Error Unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, score, hightScore, secRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((pre, cur) => pre + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "finished", payload: data }))
      .catch(dispatch({ type: "error" }));
  }, []);
  return (
    <div className="App">
      {/* <Header /> */}
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Loaded" && (
          <StartScreen questions={questions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Timer secRemaining={secRemaining} dispatch={dispatch} />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={score}
            maxPoints={maxPoints}
            hightScore={hightScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
