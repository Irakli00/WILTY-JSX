{
  // import Timer from "../components/Timer";
  /* <Timer seconds={+10} timeRanOutStyle={{ color: "red" }}></Timer> */
}
import { LobbyContext } from "../contexts/LobbyContext";

import styles from "./Lobby.module.css";

import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";

function Lobby() {
  const dynamicColors = [
    {
      border: "#eeedee",
      background: "#1a6578",
      color: "#eeedee",
    },
    {
      border: "#011e2e",
      background: "#2dd14bee",
      color: "#011e2e",
    },
    {
      border: "#990a0e", //
      background: "#db9a26",
      color: "#990a0e",
    },
    {
      border: "#eeedee",
      background: "#6c1973",
      color: "#eeedee",
    },
    {
      border: "#db9a26",
      background: "#990a0e",
      color: "#db9a26",
    },
    {
      border: "#2dd14bee",
      background: "#eeedee",
      color: "#2dd14bee",
    },
  ];

  return (
    <LobbyContext.Provider value={{ styles: dynamicColors }}>
      <section className={styles.lobby}>
        <PlayerInLobby i={0}> </PlayerInLobby>
        <PlayerInLobby i={1}> </PlayerInLobby>
        {/* <AddPlayerForm></AddPlayerForm> */}

        <Button className={"startGameBTN"}>Start a Game</Button>
      </section>
    </LobbyContext.Provider>
  );
}

export default Lobby;
