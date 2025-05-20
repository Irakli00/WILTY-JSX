import { useState, useContext } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";

function JoinGame() {
  const [idQuery, setIdQuery] = useState("");
  const [username, setUsername] = useState("");
  const [spectatorOffer, setSpectatorOffer] = useState(false);
  const { setSpectators, useGetSid } = useContext(AppContext);
  const navigate = useNavigate();

  const userSid = useGetSid();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://127.0.0.1:5000/lobby/${idQuery}`);
      const data = await res.json();

      if (data.status === "error") {
        console.log("Error joining lobby");
      } else {
        socket.emit("join_lobby", {
          username,
          room: idQuery,
          status: "player",
        });

        socket.on("joined_lobby", () => {
          navigate(`/lobby/${idQuery}`);
        });

        socket.on("joined_as_spectator", () => {
          navigate(`/lobby/${idQuery}`);
          setSpectators((p) => !p.includes(userSid) && [...p, userSid]);
        });

        socket.on("room_full", () => {
          // alert(message); // or show a modal
          setSpectatorOffer(true);
          socket.on(
            "spectator_response",
            (res) =>
              res.status &&
              socket.emit("join_lobby", {
                username,
                room: idQuery,
                status: "spectator",
              })
          );
        });
      }
    } catch (err) {
      console.error("Failed to join lobby", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Your Username:</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
          placeholder="Username"
        />
        <label htmlFor="lobbyId">Lobby ID:</label>
        <input
          onChange={(e) => setIdQuery(e.target.value)}
          value={idQuery}
          id="lobbyId"
          placeholder="Enter lobby ID"
        />
        <input type="submit" value="Join a Lobby" />
      </form>

      {spectatorOffer && (
        <>
          <p>room is full wanna be a spectator?</p>
          <button
            onClick={() => socket.emit("join_as_spectator", { answer: true })}
          >
            YES
          </button>
          <button
            onClick={() => socket.emit("join_as_spectator", { answer: false })}
          >
            NO
          </button>
        </>
      )}
    </>
  );
}

export default JoinGame;
