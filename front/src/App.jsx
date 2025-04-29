import { useReducer } from "react";

import "./index.css";

import { LobbyContext, LobbyProvider } from "./contexts/LobbyContext";
import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";

const initialState = {
  turn: 0,
  players: [
    {
      id: 0,
      nickName: "joe",
      playerStory: {
        story: "story 1",
        truth: true,
      },
    },
    {
      id: 1,
      nickName: "dan",
      playerStory: {
        story: "story 2",
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
    <>
      {status === "inactive" && (
        <StartPage dispatch={() => dispatch({ type: "initGame" })}></StartPage>
      )}
      {status === "initGame" && (
        <LobbyProvider>
          <Lobby
            onStartGame={() => dispatch({ type: "startRound" })}
            onPlayerSubmit={(x) =>
              dispatch({ type: "playerSubmit", payload: x })
            }
          ></Lobby>
        </LobbyProvider>
      )}
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
  );
}

export default App;
