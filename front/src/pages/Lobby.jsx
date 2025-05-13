import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import AddPlayerForm from "../components/AddPlayerForm";

function Lobby() {
  const { id } = useParams();
  const { players, setPlayers, hostID, setHostID } = useContext(AppContext);
  const [playersAmmount, setPlayersAmmount] = useState(null);
  const [socketID, setSocketID] = useState(null);
  const isHost = socketID === hostID;
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("set_host_id", (socketHostID) => {
      setSocketID(socketHostID);
      setHostID((id) => (!id ? socketHostID : id));
    });
  }, [socketID, hostID]);

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
    socket.emit("get_room", { room: id });

    const handleRoomsInfo = (data) => {
      setPlayersAmmount(() => data.members.length);

      if (data.room === id && data.room !== null) {
        setPlayers(data.members);
      }
      setHostID(players[0]);
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

      {isHost && (
        <Link
          onClick={() => {
            socket.emit("start_game", { room: id });
          }}
          className="startGameBTN"
          to={`/lobby/${id}/game`}
        >
          Start a Game
        </Link>
      )}
    </section>
  );
}

export default Lobby;
