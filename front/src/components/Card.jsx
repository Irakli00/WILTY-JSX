import { motion, transform } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
// import { img } from "/home/hp/Desktop/WILTY/WILTY/front/src/imgs/cardBlue.png";
import cardBlue from "../imgs/cardBlue.png";

function Card({ playerToRead, story }) {
  const [flipped, setFlipped] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    function handleFlip() {
      setFlipped(true);
    }
    socket.on("card_oppened", handleFlip);

    return () => {
      socket.off("card_oppened", handleFlip);
    };
  }, [flipped]);

  return (
    <div
      onClick={() => {
        socket.emit("open_card", { room: id, playerToRead });
      }}
    >
      <motion.div
        initial={{ backgroundImage: `url(${cardBlue})`, opacity: 0 }}
        transition={{
          duration: 0.6,
          backgroundImage: { delay: flipped ? 0.2 : 0 },
          backgroundColor: { delay: flipped ? 0.2 : 0 },
        }}
        animate={{
          rotateX: !flipped ? 0 : 180,
          backgroundImage: flipped ? "none" : `url(${cardBlue})`,
          backgroundColor: flipped ? "white" : "transparent",
          opacity: 1,
        }}
        exit={{
          x: 300,
          opacity: 0,
        }}
        className="card-container"
      >
        <motion.p
          initial={{ color: "transparent" }}
          transition={{ duration: 0.6, delay: flipped ? 0.2 : 0 }}
          animate={{
            rotateX: 180,
            color: flipped ? "red" : "transparent",
          }}
        >
          {story}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Card;
