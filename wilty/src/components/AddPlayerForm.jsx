import { useContext } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { LobbyContext } from "../contexts/LobbyContext";
import Button from "./Button";

function AddPlayerForm({ i }) {
  const { styles } = useContext(LobbyContext);

  return (
    <div style={styles[i]} className={CSSstyles.player}>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
      <form>
        <input type="text" name="playerName" id="playerName" />
        <div>
          <Button>+</Button>
          <Button>-</Button>
        </div>
      </form>
    </div>
  );
}

export default AddPlayerForm;
