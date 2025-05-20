import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./Lobby.module.css";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import AddPlayerForm from "../components/AddPlayerForm";

function Lobby() {
  const { id } = useParams();
  const {
    setPlayers,
    hostID,
    setHostID,
    useIsHost,
    spectators,
    setIsSpectator,
    isSpectator,
    useGetSid,
    usersInRoom,
    setUsersInRoom,
  } = useContext(AppContext);
  const [playersAmmount, setPlayersAmmount] = useState(null);
  const isHost = useIsHost(hostID);
  const navigate = useNavigate();
  const userSid = useGetSid();
  // console.log(isHost);

  useEffect(() => {
    socket.on("set_host_id", (socketHostID) => {
      // setSocketID(socketHostID);
      setHostID((id) => (!id ? socketHostID : id));
    });
  }, [hostID]);

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
      setPlayers(data.members);

      if (data.room === id && data.room !== null) {
        const arr = [...data.members];
        const playersArr = [];

        arr.forEach((el) => {
          playersArr.push({
            username: el,
            status: "player",
          });
        });
        setUsersInRoom([...playersArr, ...spectators]); // fix latter (ugly)
      }

      setHostID(usersInRoom[0].username || null);
    };

    socket.on("rooms_info", handleRoomsInfo);

    return () => {
      socket.off("rooms_info", handleRoomsInfo);
    };
  }, [usersInRoom]);

  useEffect(() => {
    spectators.map((el) => el.username).includes(userSid) &&
      setIsSpectator(true);
  }, [spectators, userSid]);

  return (
    <section className={styles.lobby}>
      {isSpectator && <p>You are a spectator</p>}
      <h1>Lobby ID: {id}</h1>

      {playersAmmount < 1 && <AddPlayerForm i={0} key={0}></AddPlayerForm>}

      {usersInRoom.map((user, i) => {
        return (
          user.status === "player" && (
            <PlayerInLobby
              key={i}
              i={i}
              playerName={user.username}
            ></PlayerInLobby>
          )
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
