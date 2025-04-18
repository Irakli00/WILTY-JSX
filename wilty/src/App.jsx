import "./index.css";

import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import { useReducer } from "react";

const initialState = {
  players: ["joe", "dan"],
  //inactive,lobby,tellStory,guess,over
  status: "inactive",
};

function reducer(state, action) {
  switch (action.type) {
    case "startGame": {
      return { ...state, status: "startGame" };
    }
    default:
      console.log("no");
  }
}

function App() {
  const [{ status }, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {status === "inactive" && (
        <StartPage dispatch={() => dispatch({ type: "startGame" })}></StartPage>
      )}
      {status === "startGame" && <Lobby></Lobby>}
      {status === "tellStory" && <CardRead></CardRead>}
      {status === "gameFinished" && <GameEnd></GameEnd>}
      {/* if gamestarted -> <GameProcess></GameProcess> with useReducer setting status*/}
    </>
  );
}

export default App;
