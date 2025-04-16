import "./index.css";

import Timer from "./components/Timer";
import StartMenu from "./components/StartMenu";

function App() {
  return (
    <>
      <Timer seconds={+10} timeRanOutStyle={{ color: "red" }}></Timer>
      <StartMenu></StartMenu>
    </>
  );
}

export default App;
