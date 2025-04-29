import { useContext, useRef, useEffect, useState } from "react";

import CSSstyles from "./AddPlayer.module.css";

import { AppContext } from "../contexts/AppContext";

function AddPlayerForm({ i }) {
  const { styles, setPlayers, players, useClientId } = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [story, setStory] = useState("");
  const user = { username, story, uID: useClientId() };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={styles[i]} className={CSSstyles.player}>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlayers([...players, user]);
        }}
      >
        <label htmlFor="userName">Username: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={inputRef}
          type="text"
          name="userName"
          id="userName"
        />

        <label htmlFor="story"> Story:</label>
        <input
          value={story}
          type="text"
          name="story"
          id="story"
          onChange={(e) => setStory(e.target.value)}
        />

        <input type="submit" value="+" />
        <input type="reset" value="-" onClick={null} />
      </form>
    </div>
  );
}

export default AddPlayerForm;
