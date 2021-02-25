import React, { useState, useRef } from "react";
import "./App.css";

const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

export default function App() {
  const [title, setTitle] = useState("Let the countdown begin!");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current != null) return;
    setTitle(`You're doing great!!`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        }
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current == null) return;
    setTitle("Keep it up!");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTitle("Ready to go another round?");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="app">
      <h2>{title}</h2>

      <div>
        <div className="timer">
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        {isRunning && (
          <>
            <div
              className="progressDiv"
              style={{ width: progress + "%", paddingLeft: progress - 7 + "%" }}
            >
              {Math.round(progress) + "%"}
            </div>
          </>
        )}
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && (
          <button className="stopButton" onClick={stopTimer}>
            Stop
          </button>
        )}
        <button className="resetButton" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}
