import { useEffect } from "react";

export default function Timer({ secRemaining, dispatch }) {
  const mins = Math.floor(secRemaining / 60);
  const seconds = secRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "start_timer" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
