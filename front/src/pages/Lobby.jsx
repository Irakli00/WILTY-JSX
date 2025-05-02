import { useContext, useEffect } from "react";

import styles from "./Lobby.module.css";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ onStartGame, turn }) {
  const { players, useClientId } = useContext(AppContext);

  useEffect(() => {
    console.log("players:", players);
  }, [players]);

  return (
    <section className={styles.lobby}>
      <h1>Lobby ID: {useClientId()}</h1>

      {!players.length ? (
        <AddPlayerForm i={0} key={0}></AddPlayerForm>
      ) : (
        <PlayerInLobby i={turn}>{players[turn].nickname}</PlayerInLobby>
      )}

      <Button className="startGameBTN" onClick={onStartGame}>
        Start a Game
      </Button>
    </section>
  );
}

export default Lobby;
