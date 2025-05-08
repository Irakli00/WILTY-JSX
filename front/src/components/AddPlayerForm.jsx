import { useContext, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

import CSSstyles from "./AddPlayer.module.css";

import { AppContext } from "../contexts/AppContext";

function AddPlayerForm({ i, onClick }) {
  const [player, setPlayer] = useState("");
  const { styles } = useContext(AppContext);
  const { id } = useParams();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={styles[i]} className={CSSstyles.player}>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
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
            socket.emit("join_lobby", {
              username: player,
              room: id,
            });
          }}
        />
        <input type="reset" value="-" onClick={onClick} />
      </form>
    </div>
  );
}

export default AddPlayerForm;
