import "./index.css";

import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import { useReducer } from "react";

const initialState = {
  turn: 0,
  players: [
    {
      id: 0,
      nickName: "joe",
      playerStory: {
        story: "true story",
        truth: true,
      },
    },
    {
      id: 1,
      nickName: "dan",
      playerStory: {
        story: "false story",
        truth: false,
      },
    },
  ],
  //inactive,lobby,startRound,guess,over
  status: "inactive",
};

function reducer(state, action) {
  switch (action.type) {
    case "initGame": {
      return { ...state, status: "initGame" };
    }
    case "playerSubmit": {
      const userIDs = state.players.map((el) => el.id);
      return {
        ...state,
        players: !userIDs.includes(action.payload.id)
          ? [...state.players, action.payload]
          : [...state.players],
      };
    }
    case "startRound": {
      return { ...state, status: "startRound" };
    }
    default:
      console.log("no");
  }
}

function App() {
  const [{ status, players }, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {status === "inactive" && (
        <StartPage dispatch={() => dispatch({ type: "initGame" })}></StartPage>
      )}
      {status === "initGame" && (
        <Lobby
          players={players}
          onPlayerSubmit={(x) => dispatch({ type: "playerSubmit", payload: x })}
          onStartGame={() => dispatch({ type: "startRound" })}
        ></Lobby>
      )}
      {status === "startRound" && <CardRead story={"funny story"}></CardRead>}
      {status === "gameFinished" && <GameEnd></GameEnd>}
    </>
  );
}

export default App;
