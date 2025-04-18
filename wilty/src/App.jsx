import "./index.css";

import StartMenu from "./pages/StartPage";
import Lobby from "./pages/Lobby";

const initialState = {
  players: ["joe", "dan"],
  //inactive,lobby,tellStory,guess,over
  status: "lobby",
};

function App() {
  const { status } = initialState;
  return (
    <>
      {status === "inactive" && <StartMenu></StartMenu>}
      {status === "lobby" && <Lobby></Lobby>}
      {/* if gamestarted -> <GameProcess></GameProcess> with useReducer setting status*/}
    </>
  );
}

export default App;
