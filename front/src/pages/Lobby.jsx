import { useContext, useEffect } from "react";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ onStartGame, turn, onPlayerSubmit }) {
  const { players } = useContext(AppContext);
  // const players = [];

  socket.emit("join_lobby", { username: "123", room: "123" });

  // socket.emit("join_lobby", { username: "123", room: "123" });

  // socket.emit("get_rooms");

  // socket.on("rooms_info", (data) => {
  //   console.log("Rooms info:", data);
  // });

  useEffect(() => {
    console.log("players:", players);
  }, [players]);

  return (
    <section className={styles.lobby}>
      {!players.length ? (
        <AddPlayerForm
          i={0}
          key={0}
          onPlayerSubmit={onPlayerSubmit}
        ></AddPlayerForm>
      ) : (
        <PlayerInLobby i={turn} playerName={players[0].nickName}>
          {" "}
          {/* static */}
          {players[turn].nickname}
        </PlayerInLobby>
      )}

      <Button className="startGameBTN" onClick={onStartGame}>
        Start a Game
      </Button>
    </section>
  );
}

export default Lobby;
