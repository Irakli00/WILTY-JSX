import { useContext } from "react";
import { LobbyContext } from "../contexts/LobbyContext";
import CSSstyles from "./AddPlayer.module.css";

function PlayerInLobby({ declared = false, i, onClick }) {
  const { styles } = useContext(LobbyContext);

  return (
    <div className={CSSstyles.player} style={styles[i]} onClick={onClick}>
      {declared ? (
        <>
          <div className="img-align">
            <img src="../src/icons/userEdit.svg" alt="" />
          </div>
          <div>
            <p>playerName</p>
          </div>
        </>
      ) : (
        <>
          <img src="../src/icons/userAdd.svg" alt="" width="25px" />
          <p>Add a player</p>
        </>
      )}
    </div>
  );
}

export default PlayerInLobby;
