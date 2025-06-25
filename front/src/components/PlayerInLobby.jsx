import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddPlayerForm from "./AddPlayerForm";

function PlayerInLobby({
  i,
  playerName = null,
  sid = null,
  defaultStyle = null,
}) {
  const { styles, hostID, useClientId, players } = useContext(AppContext);
  const [formOppened, setFormOppened] = useState(false);

  let playerId = useClientId();

  function handleClick() {
    playerId === players[i].id && setFormOppened((p) => !p);
  }

  return (
    <div className="player" style={defaultStyle ? defaultStyle : styles[i]}>
      <div onClick={handleClick}>
        <img
          src={
            formOppened
              ? "../src/icons/userAdd.svg"
              : "../src/icons/userEdit.svg"
          }
          alt=""
          className="cursor-pointer w-[35px] h-[35px] max-w-fit"
        />
      </div>

      {formOppened || !playerName ? (
        <AddPlayerForm
          key={i}
          playerNameUpdate={formOppened}
          onCloseForm={(f) => setFormOppened(f)}
        ></AddPlayerForm>
      ) : (
        <div className="w-full flex justify-between">
          <p>
            {playerName} {hostID === sid && "(host)"}
          </p>

          <button>Add story</button>
        </div>
      )}
    </div>
  );
}

export default PlayerInLobby;
