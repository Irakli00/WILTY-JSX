import { useEffect, useContext, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Button from "../components/Button";
import { socket } from "../socket";
import AudioCallComponent from "../components/AudioCall";

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
  // function useAudioCall(userSID, players) {
  //   const peerRef = useRef(null);

  //   useEffect(() => {
  //     // Accept incoming offer
  //     socket.on("offer", async ({ sdp, target }) => {
  //       console.log("Received offer");

  //       const peer = new RTCPeerConnection();
  //       peerRef.current = peer;

  //       // Get microphone stream
  //       const localStream = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });

  //       // Add local audio to peer connection
  //       localStream
  //         .getTracks()
  //         .forEach((track) => peer.addTrack(track, localStream));

  //       // Handle remote track
  //       const remoteStream = new MediaStream();
  //       peer.ontrack = (event) => {
  //         remoteStream.addTrack(event.track);
  //       };

  //       // Play remote audio
  //       const audioElement = new Audio();
  //       audioElement.srcObject = remoteStream;
  //       audioElement.autoplay = true;
  //       document.body.appendChild(audioElement); // Or use a ref if you prefer

  //       // Set remote description from the caller
  //       await peer.setRemoteDescription(new RTCSessionDescription(sdp));

  //       // Create and send answer
  //       const answer = await peer.createAnswer();
  //       await peer.setLocalDescription(answer);

  //       socket.emit("answer", { target, sdp: answer });
  //     });

  //     // Handle answer if this user was the one who created the offer
  //     socket.on("answer", async ({ sdp }) => {
  //       console.log("Received answer");
  //       if (
  //         peerRef.current &&
  //         peerRef.current.signalingState === "have-local-offer"
  //       ) {
  //         await peerRef.current.setRemoteDescription(
  //           new RTCSessionDescription(sdp)
  //         );
  //       } else {
  //         console.warn("Skipping setRemoteDescription: not in offer state.");
  //       }
  //     });

  //     return () => {
  //       socket.off("offer");
  //       socket.off("answer");
  //     };
  //   }, [userSID, players]);

  //   // Trigger offer
  //   const startCall = async () => {
  //     const localStream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });

  //     const peer = new RTCPeerConnection();
  //     peerRef.current = peer;

  //     localStream
  //       .getTracks()
  //       .forEach((track) => peer.addTrack(track, localStream));

  //     const offer = await peer.createOffer();
  //     await peer.setLocalDescription(offer);

  //     const targetPeer = players.filter((el) => el !== userSID)[0];
  //     socket.emit("offer", { target: targetPeer, sdp: offer });
  //   };

  //   return { startCall };
  // }

  // const { startCall } = useAudioCall(userSID, players);
  // -----------------------------------------------------

  // -----------------------------------------------------
  // async function handleAudio() {
  //   const localStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //   });

  //   const peer = new RTCPeerConnection();

  //   localStream
  //     .getTracks()
  //     .forEach((track) => peer.addTrack(track, localStream));

  //   // // Create and send offer
  //   const offer = await peer.createOffer();
  //   await peer.setLocalDescription(offer);

  //   const targetPeer = players.filter((el) => el !== userSID);

  //   socket.emit("offer", { target: targetPeer[0], sdp: offer });
  //   socket.on("offer", (x) => console.log(x)); //now answer the offer
  // }
  // -----------------------------------------------------

  return (
    <>
      {/* <button onClick={handleAudio}>TEST AUDIO</button> */}
      {/* <button onClick={startCall}>TEST AUDIO</button> */}
      <AudioCallComponent
        userSID={userSID}
        players={players}
      ></AudioCallComponent>
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
