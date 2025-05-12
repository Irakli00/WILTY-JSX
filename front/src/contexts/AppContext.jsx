import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
    let id = sessionStorage.getItem("clientId");

    if (!id) {
      id = uuidv4();
      sessionStorage.setItem("clientId", id);
    }

    setClientId(id);
  }, []);

  return clientId;
}

export function AppProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [turn, setTurn] = useState(0);
  const [stories, setStories] = useState([1, 2, 3]);
  const [hostID, setHostID] = useState(null);

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        useClientId,
        hostID,
        setHostID,
        turn,
        setTurn,
        stories,
        setStories,
        styles: dynamicColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
