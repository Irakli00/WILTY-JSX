import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";
import AddPlayerForm from "../components/AddPlayerForm";

function Lobby() {
  const { id } = useParams();
  const { players, setPlayers, hostID, setHostID, useIsHost } =
    useContext(AppContext);
  const [playersAmmount, setPlayersAmmount] = useState(null);
  const isHost = useIsHost(hostID);

  const navigate = useNavigate();

  // -----------------------------
  const location = useLocation();

  const { useClientId } = useContext(AppContext);
  let playerId = useClientId();
  // -----------------------------

  useEffect(() => {
    // console.log("Location changed:", location);
    socket.emit("user_disconnect", { id: playerId });
  }, [location]);

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
      const playersInfo = data.members.map((sid, index) => ({
        room: data.room,
        sid: sid,
        username: data.players_in_lobby[index] || "",
      }));

      setPlayersAmmount(() => data.members.length);

      if (data.room === id && data.room !== null) {
        // setPlayers(data.players_in_lobby);
        setPlayers(playersInfo);
      }
      setHostID(data.members[0]);
    };

    socket.on("rooms_info", handleRoomsInfo);

    return () => {
      socket.off("rooms_info", handleRoomsInfo);
      socket.off("get_room", handleRoomsInfo);
    };
  }, [players]);

  return (
    <>
      <h1 className="bg-slate-400 bg-opacity-20 p-2 text-center text-[1.3rem]">
        Lobby ID: <span className="text-[2.4rem] underline">{id}</span>
      </h1>
      <section className="flex flex-col m-auto max-w-[75%] mt-[15dvh] ">
        <div className="flex flex-col gap-[20px] max-h-[440px] overflow-x-scroll">
          {/* {playersAmmount < 1 && <AddPlayerForm i={0} key={0}></AddPlayerForm>} */}

          {players.map((el, i) => {
            return (
              <PlayerInLobby
                key={el.username}
                i={i}
                playerName={el.username}
              ></PlayerInLobby>
            );
          })}
        </div>

        {/* {console.log(isHost)} */}
        {isHost && playersAmmount > 1 && (
          <Link
            onClick={() => {
              socket.emit("start_game", { room: id });
            }}
            className="bg-slate-700 text-white-tint mt-3 p-4 rounded-xl text-center text-2xl transition ease-in hover:bg-yellow-800  focus:bg-yellow-800"
            to={`/lobby/${id}/game`}
          >
            Start a Game
          </Link>
        )}
      </section>
    </>
  );
}

export default Lobby;
