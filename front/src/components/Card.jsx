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
        // socket.once("card_oppened", setFlipped(true));

        // setFlipped((prevState) => !prevState);
      }}
    >
      <motion.div
        // initial={{ backgroundImage: `url(${cardBlue})`, opacity: 0 }}
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
          className="p-[20px]"
        >
          {story}
        </motion.p>
      </motion.div>
    </div>
  );

  // return !flipped ? (
  //   <motion.div
  //     className="card-container"
  //     initial={{ opacity: 0, x: -400 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: 400 }}
  //     transition={{ duration: 0.6 }}
  //     // transition={{ duration: 0.6 }}
  //     onClick={() => {
  //       // setIsFlipped(true);
  //       socket.emit("open_card", { room: id, playerToRead });
  //     }}
  //   ></motion.div>
  // ) : (
  //   <motion.div
  //     className="card-presented"
  //     initial={{ rotateX: 0 }}
  //     animate={{
  //       rotateX: 180,
  //       backgroundColor: "#fff",
  //     }}
  //     exit={{ opacity: 0, x: 400 }}
  //     transition={{ duration: 0.6 }}
  //     onClick={() => {
  //       // setIsFlipped(false);
  //       socket.emit("close_card", { room: id, playerToRead });
  //     }} //keep for now
  //   >
  //     {children}
  //   </motion.div>
  // );
}

export default Card;
