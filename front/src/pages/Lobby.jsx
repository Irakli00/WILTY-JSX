import { useContext, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";
import PlayerInLobby from "../components/PlayerInLobby";

function Lobby() {
  const { roomId } = useParams();
  const { players, hostId, setIsInLobby, useIsHost, useUpdateRoom, styles } =
    useContext(AppContext);
  const playersAmmount = players.length;

  const isHost = useIsHost(hostId);

  const navigate = useNavigate();

  // -----------------------------
  const { useClientId } = useContext(AppContext);
  let playerId = useClientId();
  // console.log(hostId, playerId);
  let location = useLocation();

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     socket.emit("user_disconnect", { id: playerId });
  //     setIsInLobby(false);
  //     console.log(location);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // -----------------------------

  // useEffect(() => {
  //   console.log("Route changed to:", location.pathname);
  // }, [location]);

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
      <h1 className="bg-slate-400 bg-opacity-20 p-2 text-center text-[1.3rem]">
        <span className="select-none">Lobby ID: </span>
        <span className="text-[2.4rem] underline">{roomId}</span>
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

        {isHost && playersAmmount > 1 && (
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
