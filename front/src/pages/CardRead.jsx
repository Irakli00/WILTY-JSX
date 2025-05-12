import { useEffect, useContext, useReducer, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const { players, turn, setTurn, stories } = useContext(AppContext);
  // const [flipped, setIsFlipped] = useState(false);

  const initialState = {
    cardIsFlipped: false,
    showCard: true,
    roundIsOver: false,
    isLastRound: false,
    turn,
    currentPlayer: null,
  };

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);

  const [
    { showCard, roundIsOver, isLastRound, cardIsFlipped, turn: reducerTurn },
    dispatch,
  ] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "roundOver": {
        return { ...state, roundIsOver: action.payload };
      }
      case "nextRound": {
        return { ...state, turn: turn + 1 };
      }
      default:
        console.log("default");
    }
  }

  useEffect(() => {
    socket.emit("current_to_read", { players, turn });
    socket.on("now_reads", (x) => {
      setCurrentPlayer(x.currentPlayer);
      setClientID(x.clientID);
    });
    // setTurn(reducerTurn);
    // socket.emit("next_round", { turn: reducerTurn, players });
    // socket.on("next_round_starts", (x) => {
    //   setCurrentPlayer(x.currentPlayer);
    //   setClientID(x.clientID);
    // });
  }, []);

  return (
    <>
      <Timer
        seconds={5}
        timeRanOutStyle={{ color: "red" }}
        onTimeRanOut={(x) => {
          dispatch({ type: "roundOver", payload: x });
        }}
      ></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <AnimatePresence>
          {showCard && (
            <Card key={turn} cardIsFlipped={cardIsFlipped}>
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && !isLastRound && clientID === currentPlayer && (
            <Button
              onClick={() => {
                dispatch({ type: "nextRound" });
              }}
            >
              Next
            </Button>
          )}
          {roundIsOver && isLastRound && <Button>vsio</Button>}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
