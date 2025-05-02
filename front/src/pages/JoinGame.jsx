import { useState } from "react";

function JoinGame() {
  const [idQuery, setIdQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idQuery.length < 3) {
      console.warn("Lobby ID too short");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/lobby/${idQuery}`);
      const data = await res.json();

      if (data.status === "error") {
        console.log("Error joining lobby");
      } else {
        console.log("Lobby joined:", data);
      }
    } catch (err) {
      console.error("Failed to join lobby", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="lobbyId">Lobby ID:</label>
      <input
        onChange={(e) => setIdQuery(e.target.value)}
        value={idQuery}
        id="lobbyId"
        placeholder="Enter lobby ID"
      />
      <input type="submit" value="Join a Lobby" />
    </form>
  );
}

export default JoinGame;
