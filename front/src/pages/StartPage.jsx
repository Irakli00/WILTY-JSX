import Button from "../components/Button";
import styles from "./StartPage.module.css"; //better to get it to its module

function StartPage({ dispatch }) {
  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        <div>
          <Button className={styles.playBtn} onClick={() => dispatch()}>
            PLAY
          </Button>
        </div>
        <div>
          <Button className={styles.rulesBtn}>Rules</Button>
          <Button className={styles.detailsBtn}>?</Button>
        </div>
      </div>
    </section>
  );
}

export default StartPage;
