export default function FinishedScreen({
  points,
  maxPoints,
  hightScore,
  dispatch,
}) {
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "👑";
  if (percentage >= 80 && percentage < 100) emoji = "🥰";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage > 0 && percentage < 50) emoji = "🙄";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <div className="result">
        <span>{emoji}</span>Your score <strong> {points} </strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)} %)
      </div>
      <div>
        <p>(Highest Score: {hightScore} points)</p>
      </div>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}
