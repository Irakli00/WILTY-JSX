import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ turn }) {
  const { id } = useParams();
  const { players, setPlayers } = useContext(AppContext);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    socket.emit("get_room", { room: id });

    const handleRoomsInfo = (data) => {
      if (data.room === id && data.room !== null) {
        setPlayers(data.members);
      }
    };

    socket.on("rooms_info", handleRoomsInfo);

    return () => {
      socket.off("rooms_info", handleRoomsInfo);
    };
  }, [players, id, setPlayers]);

  return (
    <section className={styles.lobby}>
      <h1>Lobby ID: {id}</h1>

      {!submited && (
        <AddPlayerForm
          i={0}
          key={0}
          onSubmit={(x = false) => setSubmited(x)}
        ></AddPlayerForm>
      )}
      {Object.values(players).map((nickName, i) => {
        return (
          <PlayerInLobby key={i} i={i} playerName={nickName}></PlayerInLobby>
        );
      })}

      <Button className="startGameBTN">Start a Game</Button>
    </section>
  );
}

export default Lobby;
