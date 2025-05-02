import { useReducer } from "react";

import "./index.css";

import { AppContext, AppProvider } from "./contexts/AppContext";
import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import JoinGame from "./pages/JoinGame";

const initialState = {
  turn: 0,
  players: [],
  //inactive,lobby,startRound,guess,over
  status: "inactive",
};

function reducer(state, action) {
  switch (action.type) {
    case "initGame": {
      return { ...state, status: "initGame" };
    }
    case "joinGame": {
      return { ...state, status: "joinGame" };
    }
    case "playerSubmit": {
      const userIDs = state.players.map((el) => el.id);
      //send post request here

      fetch("http://127.0.0.1:5000/existing_users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state), // Make sure to stringify the body
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      return {
        ...state,
        players: !userIDs.includes(action.payload.id)
          ? [...state.players, action.payload]
          : [...state.players],
      };
    }
    case "startRound": {
      // console.log(state);
      return { ...state, status: "startRound" };
    }
    case "nextRound": {
      console.log(state);
      return { ...state, turn: action.payload, status: "startRound" };
    }
    default:
      console.log("no");
  }
}

function App() {
  const [{ status, players, turn }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const stories = players.map((el) => el.playerStory.story);

  return (
    <AppProvider>
      <>
        {status === "inactive" && (
          <StartPage
            dispatch={() => dispatch({ type: "initGame" })}
            onJoinLobby={() => dispatch({ type: "joinGame", payload: "hi" })}
          ></StartPage>
        )}
        {status === "initGame" && (
          <Lobby
            turn={0}
            onStartGame={() => dispatch({ type: "startRound" })}
          ></Lobby>
        )}
        {status === "joinGame" && <JoinGame></JoinGame>}
        {status === "startRound" && (
          <CardRead
            key={turn}
            stories={stories}
            turn={turn}
            onNextRound={(turn) =>
              dispatch({ type: "nextRound", payload: turn + 1 })
            }
          ></CardRead>
        )}
        {status === "gameFinished" && <GameEnd></GameEnd>}
      </>
    </AppProvider>
  );
}

export default App;
