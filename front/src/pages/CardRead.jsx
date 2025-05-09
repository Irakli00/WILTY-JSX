import { useEffect, useContext, useReducer } from "react";
import { AnimatePresence } from "framer-motion";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";

function CardRead() {
  const { turn, setTurn, stories } = useContext(AppContext);
  // const [flipped, setIsFlipped] = useState(false);

  const initialState = {
    cardIsFlipped: false,
    showCard: true,
    roundIsOver: false,
    isLastRound: false,
    turn,
  };

  const [
    { showCard, roundIsOver, isLastRound, cardIsFlipped, turn: localTurn },
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
  // useEffect(() => {
  //   roundIsOver && turn + 1 === stories.length && setIsLastRound(true);
  // }, [roundIsOver, turn, stories]);

  useEffect(() => {
    setTurn(localTurn); // Sync with context after render
  }, [localTurn]);

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
          {roundIsOver && !isLastRound && (
            // <Button onClick={() => setTurn((t) => t + 1)}>Next</Button>
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
