import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby({ onStartGame, turn, onPlayerSubmit }) {
  const { id } = useParams();
  const { players, useClientId, setPlayers } = useContext(AppContext);
  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    socket.emit("get_room", { room: id });

    const handleRoomsInfo = (data) => {
      if (data.room === id && data.room !== null) {
        console.log(data);
      }
      setPlayers([...data.members]);
    };

    socket.on("rooms_info", handleRoomsInfo);

    // Cleanup the listener when the component unmounts or id changes
    return () => {
      socket.off("rooms_info", handleRoomsInfo);
    };
  }, [id]); // Run effect only when `id` changes

  return (
    <section className={styles.lobby}>
      <h1>Lobby ID: {useClientId()}</h1>
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
      {players.map(
        (el) =>
          el !== null && (
            <PlayerInLobby key={el} i={1} playerName={el}></PlayerInLobby>
          )
      )}

      <Button className="startGameBTN" onClick={onStartGame}>
        Start a Game
      </Button>
    </section>
  );
}

export default Lobby;
