import { motion, AnimatePresence } from "framer-motion";

import styles from "./Card.module.css";

function Card({ children }) {
  return (
    <motion.div
      className={styles.cardContainer}
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

export default Card;
