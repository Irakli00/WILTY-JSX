import { useContext, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

import { AppContext } from "../contexts/AppContext";

function AddPlayerForm({
  onCloseForm,
  playerNameUpdate = false,
  defaultStyle = null,
}) {
  const [player, setPlayer] = useState("");
  const { useClientId, players, useUpdateRoom } = useContext(AppContext);
  const { id } = useParams();

  let playerId = useClientId();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useUpdateRoom(id, players);

  return (
    <div className="player " style={defaultStyle}>
      <form
        className="flex gap-4 bg-none"
        onSubmit={(e) => {
          e.preventDefault();
          onCloseForm(false);
        }}
      >
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="bg-transparent border-solid border-2 border-separate"
          ref={inputRef}
          type="text"
          name="playerName"
          id="playerName"
        />
        <div className="flex gap-3">
          <input
            type="submit"
            value={playerNameUpdate ? "Change" : "Set username"}
            className="cursor-pointer text-center bg-white px-1  rounded  text-green-500 font-bold h-[22px]"
            onClick={() => {
              if (playerNameUpdate) {
                socket.emit("playerName_update", {
                  playerId,
                  username: player,
                });
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
          <input
            className="cursor-pointer text-center bg-red-500  px-1  rounded  text-white font-bold h-[22px]"
            type="reset"
            value="X"
            onClick={() => onCloseForm(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default AddPlayerForm;
