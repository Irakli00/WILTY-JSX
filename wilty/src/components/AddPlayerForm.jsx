import { useContext, useRef, useEffect } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { LobbyContext } from "../contexts/LobbyContext";
import Button from "./Button";

function AddPlayerForm({ i, onClick }) {
  const { styles } = useContext(LobbyContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={styles[i]} className={CSSstyles.player}>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
      <form onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="text" name="playerName" id="playerName" />

        <Button>+</Button>
        <Button onClick={onClick}>-</Button>
      </form>
    </div>
  );
}

export default AddPlayerForm;
