import React, { useState, useRef } from "react";

function Task({ task }) {
  const { title, details, estimateTime } = task;

  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeElapsed(0);
    clearInterval(timerRef.current);
    setFinished(false);
  };

  const finishTask = () => {
    setFinished(true);
    stopTimer();
  };

  const calculateProgress = () => {
    const progress = Math.round((timeElapsed / estimateTime) * 100);
    const accuracy = Math.round(((estimateTime - timeElapsed) / estimateTime) * 100);
    return {
      progress: isNaN(progress) ? 0 : progress,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
    };
  };

  return (
    <>
      <h1>Task</h1>
      <h1>title: {title}</h1>
      <h2>details: {details}</h2>
      <h2>estimate Time: {estimateTime} seconds</h2>
      {finished && (
        <h2>Accuracy: {calculateProgress().accuracy}%</h2>
      )}

      {finished ? (
        <h2>Time Taken: {timeElapsed} seconds</h2>
      ) : (
        <>
          <h2>Time Elapsed: {timeElapsed} seconds</h2>
          <h2>Time Left: {estimateTime - timeElapsed} seconds</h2>
          <h2>Progress: {calculateProgress().progress}%</h2>
          {timerRunning ? (
            <button onClick={stopTimer}>Stop Timer</button>
          ) : (
            <button onClick={startTimer}>Start Timer</button>
          )}
          <button onClick={resetTimer}>Reset Timer</button>
          <button onClick={finishTask}>Finish Task</button>
        </>
      )}
    </>
  );
}

export default Task;
