import { useEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const { players, turn, setTurn, SECONDS_IN_TURN, hostID, useIsHost } =
    useContext(AppContext);
  const { roomId } = useParams();

  const [seconds, setSeconds] = useState(SECONDS_IN_TURN);
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);
  const isHost = useIsHost(hostID);

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
    socket.emit("current_to_read", { players, turn: turn + 1 });

    const handleNowReads = (x) => {
      !isLastRound ? setCurrentPlayer(x.currentPlayer) : setCurrentPlayer(null);
      setClientID(x.clientID);
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
          {roundIsOver && !isLastRound && clientID === currentPlayer ? (
            <Button
              className="bg-white w-full py-8 rounded-2xl text-red-600 absolute bottom-4 text-[1.4rem] font-semibold transition ease-in-out hover:bg-red-600 hover:text-white"
              onClick={() => socket.emit("next_round", { roomId})}
            >
              {/* apply animation latter */}
              Your Turn
            </Button>
          ) : (
            roundIsOver && isLastRound && isHost && <Button>vsio</Button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
