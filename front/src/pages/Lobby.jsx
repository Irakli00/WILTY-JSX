import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerForm from "../components/AddPlayerForm";
// import { useState } from "react";

function Lobby() {
  const { id } = useParams();
  const { players, setPlayers } = useContext(AppContext);
  const [playersAmmount, setPlayersAmmount] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGameStarted = (data) => {
      if (data.room === id) {
        navigate(`/lobby/${id}/game`);
      }
    };

    socket.on("game_started", handleGameStarted);

    return () => {
      socket.off("game_started", handleGameStarted);
    };
  }, [id, navigate]);

  useEffect(() => {
    const handleRoomsInfo = (x) => {
      setPlayersAmmount(() => x.members.length);
    };

    socket.on("rooms_info", handleRoomsInfo);
  }, []);

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

      {playersAmmount < 1 && <AddPlayerForm i={0} key={0}></AddPlayerForm>}

      {Object.values(players).map((nickName, i) => {
        return (
          <PlayerInLobby key={i} i={i} playerName={nickName}></PlayerInLobby>
        );
      })}

      <Link
        onClick={() => {
          socket.emit("start_game", { room: id });
        }}
        className="startGameBTN"
        to={`/lobby/${id}/game`}
      >
        Start a Game
      </Link>
    </section>
  );
}

export default Lobby;
