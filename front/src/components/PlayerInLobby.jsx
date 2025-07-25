import { useContext, useState } from "react";

import { AppContext } from "../contexts/AppContext";
import PlayerForm from "./PlayerForm";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

function PlayerInLobby({
  i,
  playerName = null,
  id = null,
  defaultStyle = null,
}) {
  const { styles, formStyles, hostId, useClientId, players } =
    useContext(AppContext);
  const [usernameFormOppened, setUsernameFormOppened] = useState(
    !players.length
  );
  const [addStoryFormOppened, setAddStoryFormOppened] = useState(false);

  let playerId = useClientId();
  const { roomId } = useParams();

  function handleClick() {
    if (!players.length) return;
    const slotBelongsTo = players[i].id;

    playerId === slotBelongsTo && setUsernameFormOppened((p) => !p);
  }

  function updateUsername(data) {
    socket.emit("username_update", {
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

  function addStory(data) {
    socket.emit("add_story", { playerId, story: data });
  }
  return (
    <div className="player" style={defaultStyle ? defaultStyle : styles[i]}>
      <div onClick={handleClick}>
        <img
          src={
            playerId !== players[i]?.id
              ? "../src/icons/userReady.svg"
              : usernameFormOppened
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
          formStyles={formStyles.form}
          textInputStyles={formStyles.textInput}
          submitInputStyles={formStyles.submitInput}
          resetInputStyles={formStyles.resetInput}
        />
      ) : (
        <div className="w-full flex justify-between items-center">
          <p className={playerId !== players[i]?.id ? "underline" : ""}>
            {playerName} {hostId == id && "(host)"}
          </p>

          {addStoryFormOppened ? (
            <PlayerForm
              onCloseForm={() => setAddStoryFormOppened(false)}
              onDataRecieved={addStory}
              formStyles={formStyles.form}
              textInputStyles={formStyles.textInput}
              submitInputStyles={formStyles.submitInput}
              resetInputStyles={formStyles.resetInput}
              submitBtnValue="Add Story"
            ></PlayerForm>
          ) : (
            players.length &&
            playerId === players[i].id && (
              <button
                className="text-2xl"
                onClick={() => {
                  setAddStoryFormOppened((p) => !p);
                }}
              >
                {players.find((player) => player.id === playerId).story
                  ? "Change story"
                  : "Add story"}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerInLobby;
