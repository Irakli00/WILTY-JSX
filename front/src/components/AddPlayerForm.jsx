import { useContext, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";

function AddPlayerForm({ i, onClick, playerNameUpdate = false }) {
  const [player, setPlayer] = useState("");
  const { styles, useClientId, players, useUpdateRoom } =
    useContext(AppContext);
  const { id } = useParams();
  let playerId = useClientId();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useUpdateRoom(id, players);

  return (
    <div style={styles[i]} className="player ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          ref={inputRef}
          type="text"
          name="playerName"
          id="playerName"
        />

        <input
          type="submit"
          value="+"
          onClick={() => {
            if (playerNameUpdate) {
              socket.emit("playerName_update", { playerId, username: player });
              socket.once("username_updated", (d) => {
                players.find((el) => el.sid === d.sid).nickName = d.username;
              });
            } else {
              socket.emit("join_lobby", {
                username: player,
                room: id,
                playerId,
              });
            }
          }}
        />
        <input type="reset" value="-" onClick={onClick} />
      </form>
    </div>
  );
}

export default AddPlayerForm;
