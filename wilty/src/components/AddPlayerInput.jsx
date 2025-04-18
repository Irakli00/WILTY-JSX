import { useState } from "react";

import styles from "./AddPlayer.module.css";
import AddPlayerForm from "./AddPlayerForm";
import PlayerInLobby from "./PlayerInLobby";

const dynamicColors = [
  {
    border: "#eeedee",
    background: "#1a6578",
    color: "#eeedee",
  },
  {
    border: "#011e2e",
    background: "#2dd14bee",
    color: "#011e2e",
  },
  {
    border: "#990a0e", //
    background: "#db9a26",
    color: "#990a0e",
  },
  {
    border: "#eeedee",
    background: "#6c1973",
    color: "#eeedee",
  },
  {
    border: "#db9a26",
    background: "#990a0e",
    color: "#db9a26",
  },
  {
    border: "#2dd14bee",
    background: "#eeedee",
    color: "#2dd14bee",
  },
];

function AddPlayerInput() {
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <div onClick={() => setDisplayInput((p) => !p)} className={styles.player}>
      {displayInput ? (
        <AddPlayerForm></AddPlayerForm>
      ) : (
        <PlayerInLobby></PlayerInLobby>
      )}
    </div>
  );
}

export default AddPlayerInput;
