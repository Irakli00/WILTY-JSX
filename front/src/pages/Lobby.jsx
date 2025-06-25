import { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";

function Lobby() {
  const { id } = useParams();
  const { players, hostID, useIsHost, useUpdateRoom, styles } =
    useContext(AppContext);
  const playersAmmount = players.length;

  const isHost = useIsHost(hostID);

  const navigate = useNavigate();

  // -----------------------------
  const { useClientId } = useContext(AppContext);
  let playerId = useClientId();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      socket.emit("user_disconnect", { id: playerId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playerId, socket]);

  // -----------------------------

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

  useUpdateRoom(id, players);

  return (
    <>
      <h1 className="bg-slate-400 bg-opacity-20 p-2 text-center text-[1.3rem]">
        <span className="select-none">Lobby ID: </span>
        <span className="text-[2.4rem] underline">{id}</span>
      </h1>
      <section className="flex flex-col m-auto max-w-[75%] mt-[15dvh] ">
        <div className="flex flex-col gap-[20px] max-h-[440px] overflow-x-scroll">
          {!playersAmmount && (
            <PlayerInLobby defaultStyle={styles[0]} key={0}></PlayerInLobby>
          )}

          {players.map(({ nickName, sid }, i) => {
            return (
              <PlayerInLobby
                key={sid}
                i={i}
                playerName={nickName}
                sid={sid}
              ></PlayerInLobby>
            );
          })}
        </div>

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
