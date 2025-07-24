import { useContext, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";

function Lobby() {
  const { roomId } = useParams();
  const { players, hostId, setIsInLobby, useUpdateRoom, styles } =
    useContext(AppContext);
  const playersAmmount = players.length;

  const navigate = useNavigate();

  // -----------------------------
  const { useClientId } = useContext(AppContext);
  let playerId = useClientId();

  useEffect(() => {
    const handleGameStarted = (data) => {
      if (data.roomId === roomId) {
        navigate(`/lobby/${roomId}/game`);
      }
    };
    socket.on("game_started", handleGameStarted);

    return () => {
      socket.off("game_started", handleGameStarted);
    };
  }, [roomId, navigate]);

  useUpdateRoom(roomId, players);

  return (
    <>
      <h1 className="w-full bg-yellow-500/20 backdrop-blur-md border-b border-yellow-400/60 shadow-md px-6 py-4 text-center text-xl text-white font-semibold tracking-wide">
        <span className="select-none text-white">Lobby ID:</span>{" "}
        <span className="text-3xl md:text-4xl font-bold text-blue-800 underline break-all">
          {roomId}
        </span>
      </h1>

      <section className="flex flex-col m-auto max-w-[75%] mt-[15dvh] ">
        <div className="flex flex-col gap-[20px] max-h-[440px] overflow-x-scroll">
          {!playersAmmount && (
            <PlayerInLobby defaultStyle={styles[0]} key={0}></PlayerInLobby>
          )}

          {players.map(({ nickName, id }, i) => {
            return (
              <PlayerInLobby
                key={id}
                i={i}
                playerName={nickName}
                id={id}
              ></PlayerInLobby>
            );
          })}
        </div>

        {hostId == playerId && playersAmmount > 1 && (
          <Link
            onClick={() => {
              socket.emit("start_game", { roomId });
            }}
            className="bg-slate-700 text-white-tint mt-3 p-4 rounded-xl text-center text-2xl transition ease-in hover:bg-yellow-800  focus:bg-yellow-800"
            to={`/lobby/${roomId}/game`}
          >
            Start a Game
          </Link>
        )}
      </section>
    </>
  );
}

export default Lobby;
