import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ seconds, timeRanOutStyle }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [timeRanOut, setTimeRanOut] = useState(false);

  useEffect(() => {
    if (!timeLeft) return setTimeRanOut(true);

    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, timeRanOut]);

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
