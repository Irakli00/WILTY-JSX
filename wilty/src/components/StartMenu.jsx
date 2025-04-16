import styles from "./StartMenu.module.css";

function StartMenu() {
  return (
    <section className={styles.gameSection}>
      <div className={styles.gameContainer}>
        <div>
          <button className={styles.playBtn}>PLAY</button>
        </div>
        <div>
          <button className={styles.rulesBtn}>Rules</button>
          <button className={styles.detailsBtn}>?</button>
        </div>
      </div>
    </section>
  );
}

export default StartMenu;
