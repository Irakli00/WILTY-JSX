import { useContext } from "react";
import { LobbyContext } from "../contexts/LobbyContext";
import CSSstyles from "./AddPlayer.module.css";
import Button from "./Button";

function PlayerInLobby({ declared = false, i, onClick, playerName }) {
  const { styles } = useContext(LobbyContext);

  return (
    <div className={CSSstyles.player} style={styles[i]}>
      {declared ? (
        <>
          <div className="img-align">
            <img src="../src/icons/userEdit.svg" alt="" />
          </div>
          <div>
            <p>{playerName}</p>
          </div>
        </>
      ) : (
        <>
          <img src="../src/icons/userAdd.svg" alt="" width="25px" />
          <Button onClick={onClick}>Add a player</Button>
        </>
      )}
    </div>
  );
}

export default PlayerInLobby;
