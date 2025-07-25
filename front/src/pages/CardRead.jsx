import { useEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const { players, turn, setTurn, SECONDS_IN_TURN, hostId, useClientId } =
    useContext(AppContext);
  const { roomId } = useParams();
  let playerId = useClientId();

  const [seconds, setSeconds] = useState(SECONDS_IN_TURN);
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    if (roundIsOver) {
      setShowCard(false);
      // players.length === turn + 1 && setIsLastRound(true);
    }

    const handleNextRoundStarts = () => {
      setTurn((t) => t + 1);
      players.length === turn + 2 && setIsLastRound(true); //ugly gonna come back latter
      setShowCard(true);
      setRoundIsOver(false);
      setSeconds(SECONDS_IN_TURN);
    };

    socket.on("next_round_starts", handleNextRoundStarts);
    socket.emit("current_to_read", {
      player: players[turn + 1],
      turn: turn + 1,
    });

    const handleNowReads = (x) => {
      !isLastRound ? setCurrentPlayer(x.currentPlayer) : setCurrentPlayer(null);
    };

    socket.on("now_reads", handleNowReads);

    return () => {
      socket.off("now_reads", handleNowReads);
      socket.off("next_round_starts", handleNextRoundStarts);
    };
  }, [roundIsOver]);

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

      <div className="layout-container mt-[25dvh] relative">
        <AnimatePresence>
          {showCard && <Card key={turn}></Card>}
          {roundIsOver && !isLastRound && playerId === currentPlayer ? (
            <Button
              className="absolute left-1/2 top-0 -translate-x-1/2 bg-white text-red-600 w-[80%] max-w-[400px] py-6 rounded-2xl text-[1.5rem] font-bold shadow-lg transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white hover:scale-105 hover:shadow-xl"
              onClick={() => socket.emit("next_round", { roomId })}
            >
              Your Turn
            </Button>
          ) : (
            roundIsOver &&
            isLastRound &&
            hostId === playerId && <Button>vsio</Button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
