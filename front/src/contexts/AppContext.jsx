import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";

export const AppContext = createContext();

const dynamicColors = [
  {
    border: "#eeedee",
    background: "#1a6578",
    color: "#eeedee",
  },
  {
    border: "#011e2e",
    background: "#2dd14bee",
    color: "#011e2e",
  },
  {
    border: "#990a0e", //
    background: "#db9a26",
    color: "#990a0e",
  },
  {
    border: "#eeedee",
    background: "#6c1973",
    color: "#eeedee",
  },
  {
    border: "#db9a26",
    background: "#990a0e",
    color: "#db9a26",
  },
  {
    border: "#2dd14bee",
    background: "#eeedee",
    color: "#2dd14bee",
  },
];

function useClientId() {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem("clientId");

    if (!id) {
      id = uuidv4();
      localStorage.setItem("clientId", id);
    }

    setClientId(id);
  }, []);

  return clientId;
}

function useGetSid() {
  const [sid, setSid] = useState();
  socket.emit("get_sid");
  socket.once("client_sid", (data) => setSid(data.sid));

  return sid;
}

function useIsHost(hostID) {
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.emit("get_sid");

    const handleClientSID = (x) => {
      setIsHost(hostID === x.sid);
    };

    socket.on("client_sid", handleClientSID);

    return () => {
      socket.off("client_sid", handleClientSID);
    };
  }, [hostID]);

  return isHost;
}

function useUpdateRoom(roomId, players) {
  const { setPlayers, setHostID } = useContext(AppContext);

  useEffect(() => {
    if (!roomId) return;

    const handleRoomsInfo = (data) => {
      const playersInfo = data.userSids.map((sid, index) => ({
        roomId: data.roomId,
        id: data.userIds[index],
        sid: sid,
        nickName: data.userNicknames[index] || "No Username",
      }));

      if (data.roomId === roomId && data.roomId !== null) {
        setPlayers(playersInfo);
        setHostID(data.userSids[0]);
      }
    };

    socket.emit("get_room", { roomId });
    socket.on("rooms_info", handleRoomsInfo);

    return () => {
      socket.off("rooms_info", handleRoomsInfo);
    };
  }, [players]);
}

export function AppProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [isInLobby, setIsInLobby] = useState(false);
  const [stories, setStories] = useState([
    "I once had to translate between two angry customers at a supermarket who were arguing over a dropped watermelon.",
    "For about a year, I carried a teaspoon in my pocket just in case. It came in handy multiple times.",
    "For a whole summer I fed a goose at my local park every day at the same time. One day it followed me home and I had to distract it with a flapjack to escape.",
  ]);
  const [hostID, setHostID] = useState(null);
  const SECONDS_IN_TURN = 300;

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        useClientId,
        useGetSid,
        isInLobby,
        setIsInLobby,
        hostID,
        setHostID,
        turn,
        SECONDS_IN_TURN,
        setTurn,
        stories,
        setStories,
        styles: dynamicColors,

        useIsHost,
        useUpdateRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
