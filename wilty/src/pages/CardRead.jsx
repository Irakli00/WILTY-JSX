import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Card from "../components/Card";
import Timer from "../components/Timer";

function CardRead({ story }) {
  const [showCard, setShowCard] = useState(true);

  return (
    <>
      <Timer seconds={10} timeRanOutStyle={{ color: "red" }}></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <button onClick={() => setShowCard((prev) => !prev)}>
          Toggle Card
        </button>
        {/* <button onClick={() => setIsPresented((prev) => !prev)}>
          Toggle flip
        </button> */}
        <AnimatePresence>
          {showCard && (
            <Card>
              <p style={{ padding: "20px" }}>{story}</p>
            </Card>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
