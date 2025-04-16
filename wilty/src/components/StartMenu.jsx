import Button from "./Button";
import styles from "./StartMenu.module.css";

function StartMenu() {
  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        <div>
          <Button className={styles.playBtn}>PLAY</Button>
        </div>
        <div>
          <Button className={styles.rulesBtn}>Rules</Button>
          <Button className={styles.detailsBtn}>?</Button>
        </div>
      </div>
    </section>
  );
}

export default StartMenu;
