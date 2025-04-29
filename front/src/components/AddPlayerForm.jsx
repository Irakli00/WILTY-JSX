import { useContext, useRef, useEffect, useState } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { LobbyContext } from "../contexts/LobbyContext";

function AddPlayerForm({ i, onClick, onPlayerSubmit }) {
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
          onClick={
            () =>
              onPlayerSubmit({
                id: i,
                nickName: player,
                playerStory: { story: "alakazam", truth: false },
              }) //should sends reauest
          }
        />
        <input type="reset" value="-" onClick={onClick} />
      </form>
    </div>
  );
}

export default AddPlayerForm;
