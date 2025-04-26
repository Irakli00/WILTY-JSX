import { useContext, useEffect } from "react";

import styles from "./Lobby.module.css";

import { LobbyContext } from "../contexts/LobbyContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ onStartGame, onPlayerSubmit }) {
  const { players, setPlayers } = useContext(LobbyContext);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/existing_users")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.users);
      });
  }, []);

  const slots = players.length < 6 ? [...players, {}] : [...players];
  console.log(slots);
  return (
    <section className={styles.lobby}>
      {slots.map((_, i) => {
        if (!players[i]?.nickName) {
          return (
            <AddPlayerForm i={i} key={i} onPlayerSubmit={onPlayerSubmit} />
          );
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
  );
}

export default Lobby;
