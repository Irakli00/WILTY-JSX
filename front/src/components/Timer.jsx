import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer({ seconds, onTimeRanOut, timeRanOutStyle }) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    console.log("seconds", seconds);
    setSecondsLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeRanOut(true);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className={styles.countdown}>
      <span style={secondsLeft <= 0 ? timeRanOutStyle : null}>
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
}

export default Timer;
