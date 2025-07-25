import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

function JoinGame() {
  const [roomIdQuery, setroomIdQuery] = useState("");
  const [username, setUsername] = useState("");
  const { useClientId, setIsInLobby, isInLobby, setPlayers, randomStories } =
    useContext(AppContext);
  const navigate = useNavigate();
  let playerId = useClientId();

  // -----------------------------
  // const location = useLocation();

  // useEffect(() => {
  //   socket.emit("user_disconnect", { id: localStorage.getItem("clientId") });
  //   setIsInLobby(false);

  //   const blockNav = () => {
  //     const path = window.location.pathname;

  //     if (path === `/lobby/${123}`) {
  //       navigate("/join_lobby", { replace: true });
  //     }
  //   };

  //   window.addEventListener("popstate", blockNav);

  //   //this gotta update players state as well
  //   // useUpdateRoom(id, players);
  // }, [location, navigate]);

  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://127.0.0.1:5000/lobby/${roomIdQuery}`);
      const data = await res.json();

      if (data.status === "error") {
        console.log("Error joining lobby");
        return;
      }

      socket.once("room_full", () => {
        alert("Lobby is full!");
      });

      const roomId = roomIdQuery;

      socket.emit("join_lobby", { username, roomId, playerId });

      socket.once("joined_lobby", () => {
        setIsInLobby(true);
        navigate(`/lobby/${roomIdQuery}`);

        socket.emit("get_room", { roomIdQuery });
        socket.on("rooms_info", (data) => {
          const playersInfo = data.userIds.map((_, index) => ({
            roomId: data.roomId,
            id: data.userIds[index],
            nickName: data.userNicknames[index] || "No Username",
            story: data.userStories[index],
          }));
          setPlayers(playersInfo);
        });
      });
    } catch (err) {
      console.error("Failed to join lobby", err);
    }
  };

  return (
    <section className="layout-container">
      <form
        className="join-lobby-form min-w-[50dvw] bg-blue-400 bg-opacity-50  p-[40px] flex flex-col gap-24 rounded-3xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="join-lobby-form-input">
          <label htmlFor="userName">Your Username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="username"
            placeholder="Username"
            type="text"
          />
        </div>
        <div className="join-lobby-form-input">
          <label htmlFor="lobbyId">Lobby ID:</label>
          <input
            onChange={(e) => setroomIdQuery(e.target.value)}
            value={roomIdQuery}
            id="lobbyId"
            placeholder="e.g. 7dec3064-83ae-43f0-8b8e-ak529f5b68c3"
            type="text"
          />
        </div>
        <input type="submit" value="Join a Lobby" />
      </form>
    </section>
  );
}

export default JoinGame;
