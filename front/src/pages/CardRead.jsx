import { useEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";

function CardRead() {
  const {
    players,
    turn,
    setTurn,
    stories,
    SECONDS_IN_TURN,
    hostID,
    useIsHost,
    useGetSid,
  } = useContext(AppContext);

  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [showCard, setShowCard] = useState(true);
  const [roundIsOver, setRoundIsOver] = useState(false);
  const [isLastRound, setIsLastRound] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [clientID, setClientID] = useState(null);

  const { id } = useParams();
  const userSID = useGetSid();
  const isHost = useIsHost(hostID);

  useEffect(() => {
    if (roundIsOver) {
      setShowCard(false);
      // players.length === turn + 1 && setIsLastRound(true);
    }

    const handleNextRoundStarts = () => {
      setTurn((t) => t + 1);
      players.length === turn + 2 && setIsLastRound(true); //ugly gonna come back latter
      setShowCard(true);
      setRoundIsOver(false);
      setSeconds(SECONDS_IN_TURN);
    };

    socket.on("next_round_starts", handleNextRoundStarts);
    socket.emit("current_to_read", { players, turn: turn + 1 });

    const handleNowReads = (x) => {
      !isLastRound ? setCurrentPlayer(x.currentPlayer) : setCurrentPlayer(null);
      setClientID(x.clientID);
    };

    socket.on("now_reads", handleNowReads);

    return () => {
      socket.off("now_reads", handleNowReads);
      socket.off("next_round_starts", handleNextRoundStarts);
    };
  }, [roundIsOver]);

  // -----------------------------------------------------
  async function handleAudio() {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const peer = new RTCPeerConnection();
    localStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, localStream));

    // // Create and send offer
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    // socket.emit("get_room", { room: id });
    // socket.on("rooms_info", (x) => {
    //   setPeers(x.members.filter((el) => el !== userSID));
    // });
    const targetPeer = players.filter((el) => el !== userSID);

    socket.emit("offer", { target: targetPeer[0], sdp: offer });
    socket.on("offer", (x) => console.log(x));
  }
  // -----------------------------------------------------

  return (
    <>
      <button onClick={handleAudio}>TEST AUDIO</button>
      <Timer
        seconds={seconds}
        timeRanOutStyle={{ color: "red" }}
        onTimeRanOut={(bool) => {
          setRoundIsOver(bool);
          setSeconds(0); //ugly but gonna fix latter
        }}
      ></Timer>

      <div style={{ marginTop: "15dvh" }}>
        <AnimatePresence>
          {showCard && (
            <Card
              key={turn}
              cardIsFlipped={cardIsFlipped}
              playerToRead={players[turn]}
            >
              <p style={{ padding: "20px" }}>{stories[turn]}</p>
            </Card>
          )}
          {roundIsOver && !isLastRound && clientID === currentPlayer ? (
            <Button onClick={() => socket.emit("next_round", { room: id })}>
              Your Turn
            </Button>
          ) : (
            roundIsOver && isLastRound && isHost && <Button>vsio</Button>
          )}
          {/* {roundIsOver & isLastRound && <Button>vsio</Button>} */}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CardRead;
