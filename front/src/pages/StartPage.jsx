import { Link } from "react-router-dom";

import Button from "../components/Button";
import styles from "./StartPage.module.css"; //better to get it to its module
import { AppContext } from "../contexts/AppContext";

function StartPage({ dispatch, onJoinLobby }) {
  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        {/* ------------------------------------------------ */}
        {/* {useEffect(() => {
          let id = sessionStorage.getItem("clientId");
          if (id) {
            fetch("http://localhost:5000/lobby_manager", {
              method: "POST",
              body: JSON.stringify({
                userId: id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .catch((error) => console.error("Error:", error));
          }
        }, [])} */}

        {/* ------------------------------------------------ */}

        <Link to={`/123`} className={styles.playBtn} onClick={() => dispatch()}>
          PLAY
        </Link>
        <div>
          <Link className={styles.rulesBtn} to={""} onClick={onJoinLobby}>
            Join a game
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StartPage;
