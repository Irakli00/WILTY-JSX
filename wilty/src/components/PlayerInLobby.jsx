import { useContext } from "react";
import { LobbyContext } from "../contexts/LobbyContext";
import CSSstyles from "./AddPlayer.module.css";

function PlayerInLobby({ declared = false, i }) {
  const { styles } = useContext(LobbyContext);

  return (
    <div
      className={CSSstyles.player}
      style={styles[i]}
      onClick={(e) => console.log(e.target)}
    >
      {declared ? (
        <>
          <div className="img-align">
            <ion-icon name="person-outline"></ion-icon>
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
