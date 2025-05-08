// import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import { AppContext, AppProvider } from "./contexts/AppContext";
import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import JoinGame from "./pages/JoinGame";

// function reducer(state, action) {
//   switch (action.type) {

//     case "startRound": {
//       // console.log(state);
//       return { ...state, status: "startRound" };
//     }
//     case "nextRound": {
//       console.log(state);
//       return { ...state, turn: action.payload, status: "startRound" };
//     }
//     default:
//       console.log("no");
//   }
// }

function App() {
  // const [{ status, players, turn }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  // const stories = players.map((el) => el.playerStory.story);

  return (
    <Routes>
      <Route index path="/" element={<StartPage />} />

      <Route
        path={`lobby/:id`}
        element={
          <>
            <Lobby turn={0} />

            {/* {status === "joinGame" && <JoinGame />}
            {status === "startRound" && (
              <CardRead
                key={turn}
                stories={stories}
                turn={turn}
                onNextRound={(turn) =>
                  dispatch({ type: "nextRound", payload: turn + 1 })
                }
              />
            )}
            {status === "gameFinished" && <GameEnd />} */}
          </>
        }
      />
      <Route path="/join_lobby" element={<JoinGame></JoinGame>} />
    </Routes>
  );
}

export default App;
