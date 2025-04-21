import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Card from "../components/Card";
import Timer from "../components/Timer";

function CardRead({ story }) {
  const [showCard, setShowCard] = useState(true);

  // setTimeout(() => {
  //   setShowCard(false);
  // }, 3000);

  return (
    <>
      <Timer seconds={10} timeRanOutStyle={{ color: "red" }}></Timer>

      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <button onClick={() => setShowCard((prev) => !prev)}>
          Toggle Card
        </button>
        <AnimatePresence>
          {showCard && (
            <Card>
              <p style={{ padding: "20px" }}>I'm an animated card!</p>
            </Card>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
