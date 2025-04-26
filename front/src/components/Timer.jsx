import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ seconds, timeRanOutStyle, onTimeRanOut }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [timeRanOut, setTimeRanOut] = useState(false);

  useEffect(() => {
    if (!timeLeft) {
      onTimeRanOut();
      return setTimeRanOut(true);
    }

    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, timeRanOut, onTimeRanOut]);

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className={styles.countdown}>
      <span style={timeRanOut ? timeRanOutStyle : null}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

export default Timer;
