import { useContext } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { LobbyContext } from "../contexts/LobbyContext";
import Button from "./Button";

function AddPlayerForm({ i, onClick }) {
  const { styles } = useContext(LobbyContext);

  return (
    <div style={styles[i]} className={CSSstyles.player} onClick={onClick}>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="playerName" id="playerName" />

        <Button>+</Button>
      </form>
    </div>
  );
}

export default AddPlayerForm;
