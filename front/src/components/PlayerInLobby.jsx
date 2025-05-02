import { useContext } from "react";

import CSSstyles from "./AddPlayer.module.css";
import Button from "./Button";
import { AppContext } from "../contexts/AppContext";

function PlayerInLobby({ i }) {
  const { styles } = useContext(AppContext);

  return (
    <div className={CSSstyles.player} style={styles[i]}>
      <div className="img-align">
        <img src="../src/icons/userEdit.svg" alt="" />
      </div>
      <div>
        <p>kfls</p>
      </div>
    </div>
  );
}

export default PlayerInLobby;
