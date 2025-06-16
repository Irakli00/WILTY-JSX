import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function PlayerInLobby({ i, playerName }) {
  const { styles, useIsHost, hostID, useClientId } = useContext(AppContext);
  const isHost = useIsHost(hostID);
  // console.log(id) === storage id;

  return (
    <div className="player" style={styles[i]}>
      {
        <>
          <div className="img-align">
            <img src="../src/icons/userEdit.svg" alt="" />
          </div>
          <div>
            <p>
              {playerName} {isHost && "(host)"}
            </p>
          </div>
        </>
      }
    </div>
  );
}

export default PlayerInLobby;
