import { Link } from "react-router-dom";

import Button from "../components/Button";
import styles from "./StartPage.module.css"; //better to get it to its module
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

function StartPage({ dispatch }) {
  const { useClientId } = useContext(AppContext);
  const id = useClientId();
  console.log(id);

  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        {/* ------------------------------------------------ */}
        {useEffect(() => {
          fetch("http://localhost:5000/lobby_manager", {
            method: "POST",
            body: JSON.stringify({
              userId: id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
        }, [])}
        {/* ------------------------------------------------ */}

        <Link
          to={`/${useClientId()}`}
          className={styles.playBtn}
          onClick={() => dispatch()}
        >
          PLAY
        </Link>
        <div>
          <Button className={styles.rulesBtn}>Join a game</Button>
          {/* <Button className={styles.rulesBtn}>Rules</Button> */}
          {/* <Button className={styles.detailsBtn}>?</Button> */}
        </div>
      </div>
    </section>
  );
}

export default StartPage;
