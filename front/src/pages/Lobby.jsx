import { LobbyContext } from "../contexts/LobbyContext";

import styles from "./Lobby.module.css";

import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

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

function Lobby({ players, onPlayerSubmit, onStartGame }) {
  const slots = players.length < 6 ? [...players, {}] : [...players];
  return (
    <LobbyContext.Provider value={{ styles: dynamicColors, onPlayerSubmit }}>
      <section className={styles.lobby}>
        {slots.map((_, i) => {
          if (!players[i]?.nickName) {
            return <AddPlayerForm i={i} key={i} />;
          } else {
            return (
              <PlayerInLobby
                i={i}
                key={i}
                onClick={""}
                playerName={players.map((el) => el.nickName)[i]}
              />
            );
          }
        })}
        <Button className="startGameBTN" onClick={onStartGame}>
          Start a Game
        </Button>
      </section>
    </LobbyContext.Provider>
  );
}

export default Lobby;
