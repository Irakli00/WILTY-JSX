import "./index.css";

import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import { useReducer } from "react";

const initialState = {
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
  //inactive,lobby,tellStory,guess,over
  status: "inactive",
};

function reducer(state, action) {
  switch (action.type) {
    case "startGame": {
      return { ...state, status: "startGame" };
    }
    case "playerSubmit": {
      const userIDs = state.players.map((el) => el.id);
      console.log(state, action.payload.id);
      return {
        ...state,
        players: !userIDs.includes(action.payload.id)
          ? [...state.players, action.payload]
          : [...state.players],
      };
      //se if id is there and if so replace
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
        <StartPage dispatch={() => dispatch({ type: "startGame" })}></StartPage>
      )}
      {status === "startGame" && (
        <Lobby
          players={players}
          onPlayerSubmit={(x) => dispatch({ type: "playerSubmit", payload: x })}
        ></Lobby>
      )}
      {status === "tellStory" && <CardRead></CardRead>}
      {status === "gameFinished" && <GameEnd></GameEnd>}
    </>
  );
}

export default App;
