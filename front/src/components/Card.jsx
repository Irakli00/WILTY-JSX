import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Card.module.css";
import { socket } from "../socket";

function Card({ children, cardIsFlipped }) {
  const [flipped, setIsFlipped] = useState(cardIsFlipped);
  const { id } = useParams();

  useEffect(() => {
    function handleFlip() {
      setIsFlipped((p) => !p);
    }
    socket.on("card_oppened", handleFlip);
    socket.on("card_closed", handleFlip);

    return () => {
      socket.off("card_oppened", handleFlip);
      socket.off("card_closed", handleFlip);
    };
  }, [flipped]);

  return !flipped ? (
    <motion.div
      className={styles.cardContainer}
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.6 }}
      // transition={{ duration: 0.6 }}
      onClick={() => {
        // setIsFlipped(true);
        socket.emit("open_card", { room: id });
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
        // setIsFlipped(false);
        socket.emit("close_card", { room: id });
      }} //keep for now
    >
      {children}
    </motion.div>
  );
}

export default Card;
