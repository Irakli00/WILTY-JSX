import { useContext, useRef, useEffect, useState } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { LobbyContext } from "../contexts/LobbyContext";
import Button from "./Button";

function AddPlayerForm({ i, onClick }) {
  const [player, setPlayer] = useState("");
  const { styles } = useContext(LobbyContext);

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
          console.log(player);
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

        <input type="submit" value="+" />
        <input type="reset" value="-" onClick={onClick} />
      </form>
    </div>
  );
}

export default AddPlayerForm;
