import { useEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const {
    players,
    turn,
    setTurn,
    stories,
    SECONDS_IN_TURN,
    hostID,
    useIsHost,
  } = useContext(AppContext);
  const { id } = useParams();

  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);
  const isHost = useIsHost(hostID);

  useEffect(() => {
    if (roundIsOver) {
      setShowCard(false);
      setTurn((t) => t + 1);
      players.length === turn + 1 && setIsLastRound(true);
    }
  }, [roundIsOver]);

  // useEffect(() => {
  //   socket.emit("current_to_read", { players, turn });

  //   const handleNowReads = (x) => {
  //     setCurrentPlayer(x.currentPlayer);
  //     setClientID(x.clientID);
  //   };

  //   socket.on("now_reads", handleNowReads);

  //   return () => {
  //     socket.off("now_reads", handleNowReads);
  //   };
  // }, [turn]);

  useEffect(() => {
    const handleNextRoundStarts = () => {
      setShowCard(true);
      setRoundIsOver(false);
      setSeconds(SECONDS_IN_TURN);
    };

    socket.on("next_round_starts", handleNextRoundStarts);

    socket.emit("current_to_read", { players, turn });

    const handleNowReads = (x) => {
      setCurrentPlayer(x.currentPlayer);
      setClientID(x.clientID);
    };

    socket.on("now_reads", handleNowReads);

    return () => {
      socket.off("now_reads", handleNowReads);
      socket.off("next_round_starts", handleNextRoundStarts);
    };

    // return () => {
    //   socket.off("next_round_starts", handleNextRoundStarts);
    // };
  }, [turn]);

  return (
    <>
      <Timer
        seconds={seconds}
        timeRanOutStyle={{ color: "red" }}
        onTimeRanOut={(bool) => {
          setRoundIsOver(bool);
          setSeconds(0); //ugly but gonna fix latter
        }}
      ></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <AnimatePresence>
          {showCard && (
            <Card
              key={turn}
              cardIsFlipped={cardIsFlipped}
              playerToRead={players[turn]}
            >
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && !isLastRound && clientID === currentPlayer ? (
            <Button onClick={() => socket.emit("next_round", { room: id })}>
              Your Turn
            </Button>
          ) : (
            roundIsOver && isLastRound && isHost && <Button>vsio</Button>
          )}
          {/* {roundIsOver & isLastRound && <Button>vsio</Button>} */}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
