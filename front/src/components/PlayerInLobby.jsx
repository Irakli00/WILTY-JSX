import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import CSSstyles from "./AddPlayer.module.css";
import Button from "./Button";

function PlayerInLobby({ i, playerName, hostID }) {
  const { styles } = useContext(AppContext);

  return (
    <div className={CSSstyles.player} style={styles[i]}>
      {
        <>
          <div className="img-align">
            <img src="../src/icons/userEdit.svg" alt="" />
          </div>
          <div>
            <p>
              {playerName} {hostID === playerName && "(host)"}
            </p>
          </div>
        </>
      }
    </div>
  );
}

export default PlayerInLobby;
