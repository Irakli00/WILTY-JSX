import { useEffect, useContext, useState, useRef } from "react";

import { socket } from "../socket";

export default function AudioCallComponent({ userSID, players }) {
  const peerRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    socket.on("offer", async ({ sdp, target }) => {
      const peer = new RTCPeerConnection();
      peerRef.current = peer;

      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStream
        .getTracks()
        .forEach((track) => peer.addTrack(track, localStream));

      const remoteStream = new MediaStream();
      peer.ontrack = (event) => {
        remoteStream.addTrack(event.track);
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play().catch(console.error);
        }
      };

      await peer.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("answer", { target, sdp: answer });
    });

    socket.on("answer", async ({ sdp }) => {
      if (
        peerRef.current &&
        peerRef.current.signalingState === "have-local-offer"
      ) {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription(sdp)
        );
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
    };
  }, [userSID, players]);

  const startCall = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const peer = new RTCPeerConnection();
    peerRef.current = peer;

    localStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, localStream));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    const target = players.find((p) => p !== userSID);
    socket.emit("offer", { target, sdp: offer });
  };

  return (
    <div>
      <button onClick={startCall}>Start Audio Call</button>
      <audio ref={remoteAudioRef} autoPlay controls />
    </div>
  );
}
