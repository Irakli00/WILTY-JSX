import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddPlayerForm from "./AddPlayerForm";

function PlayerInLobby({ i, playerName, sid }) {
  const { styles, hostID } = useContext(AppContext);
  const [formOppened, setFormOppened] = useState(false);

  function handleClick(e) {
    setFormOppened((p) => !p);
  }

  return (
    <div className="player" style={styles[i]} onClick={(e) => handleClick(e)}>
      <div className="img-align">
        <img src="../src/icons/userEdit.svg" alt="" />
      </div>
      {formOppened ? (
        <AddPlayerForm i={0} key={0}></AddPlayerForm>
      ) : (
        <div>
          <p>
            {playerName} {hostID === sid && "(host)"}
          </p>
        </div>
      )}
    </div>
  );
}

export default PlayerInLobby;
