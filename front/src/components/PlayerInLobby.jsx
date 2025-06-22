import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddPlayerForm from "./AddPlayerForm";

function PlayerInLobby({ i, playerName, sid }) {
  const { styles, hostID, useClientId, players } = useContext(AppContext);
  const [formOppened, setFormOppened] = useState(false);

  let playerId = useClientId();

  function handleClick() {
    playerId === players[i].id && setFormOppened((p) => !p);
  }

  return (
    <div className="player" style={styles[i]}>
      <div className="img-align" onClick={handleClick}>
        {formOppened ? (
          <img src="../src/icons/userEdit.svg" alt="" />
        ) : (
          <img src="../src/icons/userAdd.svg" alt="" />
        )}
      </div>

      {formOppened ? (
        <AddPlayerForm
          i={i}
          key={i}
          playerNameUpdate={true}
          onSubmit={(f) => setFormOppened(f)}
        ></AddPlayerForm>
      ) : (
        <div className="w-full flex justify-between">
          <div>
            <p>
              {playerName} {hostID === sid && "(host)"}
            </p>
          </div>
          <div>
            <button>Add story</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerInLobby;
