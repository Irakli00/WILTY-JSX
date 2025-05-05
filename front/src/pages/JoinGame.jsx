import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

function JoinGame() {
  const [idQuery, setIdQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://127.0.0.1:5000/lobby/${idQuery}`);
      const data = await res.json();

      if (data.status === "error") {
        console.log("Error joining lobby");
      } else {
        console.log("joined");
        socket.emit("join_lobby", { username, room: idQuery });
        navigate(`/lobby/${idQuery}`);
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
    </>
  );
}

export default JoinGame;
