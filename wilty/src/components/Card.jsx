import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import styles from "./Card.module.css";

function Card({ children }) {
  const [flippable, setIsFlippable] = useState(false);

  return (
    //by state maybe? like presented ? this animation: flip animation
    !flippable ? (
      <motion.div
        className={styles.cardContainer}
        initial={{ opacity: 0, x: -400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.6 }}
        onClick={() => {
          setIsFlippable(true);
        }}
      ></motion.div>
    ) : (
      <motion.div
        className={styles.cardPresented}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 180 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.6 }}
        onClick={() => {
          setIsFlippable(false);
        }} //keep for now
      >
        {children}
      </motion.div>
    )
  );
}

export default Card;
