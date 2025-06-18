import { createContext, useState, useEffect } from "react";
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

export function AppProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [stories, setStories] = useState([1, 2, 3]);
  const [hostID, setHostID] = useState(null);
  const SECONDS_IN_TURN = 300;

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        useClientId,
        hostID,
        setHostID,
        turn,
        SECONDS_IN_TURN,
        setTurn,
        stories,
        setStories,
        styles: dynamicColors,

        useIsHost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
