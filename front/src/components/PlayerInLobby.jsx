import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function PlayerInLobby({ i, playerName, sid }) {
  const { styles, hostID } = useContext(AppContext);

  return (
    <div className="player" style={styles[i]}>
      {
        <>
          <div className="img-align">
            <img src="../src/icons/userEdit.svg" alt="" />
          </div>
          <div>
            <p>
              {playerName} {hostID === sid && "(host)"}
            </p>
          </div>
        </>
      }
    </div>
  );
}

export default PlayerInLobby;
