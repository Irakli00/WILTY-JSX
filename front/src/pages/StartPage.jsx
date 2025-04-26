import { Link } from "react-router-dom";

import Button from "../components/Button";
import styles from "./StartPage.module.css"; //better to get it to its module

import { v4 as uuidv4 } from "uuid";

const id = uuidv4().slice(0, 10);

function StartPage({ dispatch }) {
  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        <Link
          to={`/${id}`}
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
