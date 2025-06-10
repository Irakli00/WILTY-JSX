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
        return;
      }

      socket.once("room_full", () => {
        alert("Lobby is full!");
      });

      socket.emit("join_lobby", { username, room: idQuery });
      socket.once("joined_lobby", () => {
        navigate(`/lobby/${idQuery}`);
      });
    } catch (err) {
      console.error("Failed to join lobby", err);
    }
  };

  return (
    <section className="layout-container ">
      <form
        className="join-lobby-form bg-blue-400 bg-opacity-50 h-[50dvh] p-[40px] flex flex-col gap-24"
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
            onChange={(e) => setIdQuery(e.target.value)}
            value={idQuery}
            id="lobbyId"
            placeholder="e.g 7dec3064-83ae-43f0-8b8e-ak529f5b68c3"
            type="text"
          />
        </div>
        <input type="submit" value="Join a Lobby" />
      </form>
    </section>
  );
}

export default JoinGame;
