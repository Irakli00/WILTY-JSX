import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

function CardRead({ stories, turn, onNextRound }) {
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);

  useEffect(() => {
    roundIsOver && console.log("hdad");
  }, [roundIsOver]);

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
            <Card>
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && <Button onClick={onNextRound}>Next</Button>}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
