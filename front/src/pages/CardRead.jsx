import { useEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const { players, turn, setTurn, stories } = useContext(AppContext);
  const { id } = useParams();

  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    if (roundIsOver) {
      setShowCard(false);
      setTurn((t) => t + 1);
    }
  }, [roundIsOver]);

  useEffect(() => {
    socket.emit("current_to_read", { players, turn });

    const handleNowReads = (x) => {
      setCurrentPlayer(x.currentPlayer);
      setClientID(x.clientID);
    };

    socket.on("now_reads", handleNowReads);

    return () => {
      socket.off("now_reads", handleNowReads);
    };
  }, [turn]);

  useEffect(() => {
    socket.emit("join", { room: id });

    const handleNextRoundStarts = (data) => {
      console.log("🔥 Received next_round_starts", data);
      setShowCard(true);
    };

    socket.on("next_round_starts", handleNextRoundStarts);

    return () => {
      socket.off("next_round_starts", handleNextRoundStarts);
    };
  }, []);

  return (
    <>
      <Timer
        seconds={5}
        timeRanOutStyle={{ color: "red" }}
        onTimeRanOut={(bool) => setRoundIsOver(bool)}
      ></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <AnimatePresence>
          {showCard && (
            <Card key={turn} cardIsFlipped={cardIsFlipped}>
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && !isLastRound && clientID === currentPlayer && (
            <Button onClick={() => socket.emit("next_round", { room: id })}>
              Your Turn
            </Button>
          )}
          {roundIsOver & isLastRound && <Button>vsio</Button>}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
