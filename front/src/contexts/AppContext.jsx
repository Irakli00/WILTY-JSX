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

const tempUsers = [
  // {
  //   id: 0,
  //   nickName: "joe",
  //   playerStory: {
  //     story: "story 1",
  //     truth: true,
  //   },
  // },
  // {
  //   id: 1,
  //   nickName: "dan",
  //   playerStory: {
  //     story: "story 2",
  //     truth: false,
  //   },
  // },
];

function useClientId() {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    // Check if ID exists in localStorage
    let id = sessionStorage.getItem("clientId");

    // If not, create a new UUID using the uuid library
    if (!id) {
      id = uuidv4();
      sessionStorage.setItem("clientId", id);
    }

    setClientId(id);
  }, []);

  return clientId;
}

export function AppProvider({ children }) {
  const [players, setPlayers] = useState(tempUsers);

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        useClientId,
        styles: dynamicColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
