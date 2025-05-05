import { useContext, useState } from "react";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ onStartGame, turn, onPlayerSubmit }) {
  const { players } = useContext(AppContext);
  const [submited, setSubmited] = useState(false);

  // socket.emit("join_lobby", { username: "123", room: "123" });
  socket.emit("get_room", { room: "123" });

  socket.on("rooms_info", (data) => {
    console.log("Rooms info:", data.members);
  });

  return (
    <section className={styles.lobby}>
      {!submited ? (
        <AddPlayerForm
          i={0}
          key={0}
          onPlayerSubmit={(x) => {
            setSubmited(true);
            onPlayerSubmit(x);
          }}
        ></AddPlayerForm>
      ) : (
        <PlayerInLobby key={0} i={0} playerName={players[0].nickName}>
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
