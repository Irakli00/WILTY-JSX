import { useContext, useState } from "react";

import { AppContext } from "../contexts/AppContext";
import PlayerForm from "./PlayerForm";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

function PlayerInLobby({
  i,
  playerName = null,
  sid = null,
  defaultStyle = null,
}) {
  //
  const { styles, hostID, useClientId, players } = useContext(AppContext);
  const [usernameFormOppened, setUsernameFormOppened] = useState(
    !players.length
  );
  const [addStoryFormOppened, setAddStoryFormOppened] = useState(false);

  let playerId = useClientId();
  const { roomId } = useParams();

  function handleClick() {
    if (!players.length) return;

    playerId === players[0].id && setUsernameFormOppened((p) => !p);
  }

  function updateUsername(data) {
    socket.emit("playerName_update", {
      playerId,
      username: data,
    });

    socket.once("no_user", () => {
      socket.emit("join_lobby", {
        username: data,
        roomId,
        playerId,
      });
    });
  }

  return (
    <div className="player" style={defaultStyle ? defaultStyle : styles[i]}>
      <div onClick={handleClick}>
        <img
          src={
            usernameFormOppened
              ? "../src/icons/userAdd.svg"
              : "../src/icons/userEdit.svg"
          }
          alt=""
          className="cursor-pointer w-[35px] h-[35px] max-w-fit"
        />
      </div>

      {usernameFormOppened ? (
        <PlayerForm
          onDataRecieved={updateUsername}
          onCloseForm={() => setUsernameFormOppened(false)}
          formStyles="flex gap-4 bg-none"
          textInputStyles="bg-transparent border-2 border-solid border-separate"
          submitInputStyles="cursor-pointer text-center bg-white mr-2 px-1 rounded text-green-500 font-bold h-[22px]"
          resetInputStyles="cursor-pointer text-center bg-red-500 px-1 rounded text-white font-bold h-[22px]"
        />
      ) : (
        <div className="w-full flex justify-between">
          <p>
            {playerName} {hostID === sid && "(host)"}
          </p>

          {addStoryFormOppened ? (
            <PlayerForm
              onCloseForm={() => setAddStoryFormOppened(false)}
            ></PlayerForm>
          ) : (
            <button onClick={() => setAddStoryFormOppened(true)}>
              Add story
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerInLobby;
