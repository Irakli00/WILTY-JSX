import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

function CardRead({ stories, turn, onNextRound }) {
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLasrRound] = useState(false);

  useEffect(() => {
    roundIsOver && turn + 1 === stories.length && setIsLasrRound(true);
  }, [roundIsOver, turn, stories]);

  return (
    <>
      <Timer
        seconds={5}
        timeRanOutStyle={{ color: "red" }}
        onTimeRanOut={() => {
          setRoundIsOver(true);

          setTimeout(() => {
            setShowCard(false);
          }, 500);
        }}
      ></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <AnimatePresence>
          {showCard && (
            <Card key={turn}>
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && !isLastRound && (
            <Button onClick={() => onNextRound(turn)}>Next</Button>
          )}
          {roundIsOver && isLastRound && <Button>vsio</Button>}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
