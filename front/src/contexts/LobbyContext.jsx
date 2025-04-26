import { createContext, useState } from "react";

export const LobbyContext = createContext();

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
  {
    id: 0,
    nickName: "joe",
    playerStory: {
      story: "story 1",
      truth: true,
    },
  },
  {
    id: 1,
    nickName: "dan",
    playerStory: {
      story: "story 2",
      truth: false,
    },
  },
];

export function LobbyProvider({ children }) {
  const [players, setPlayers] = useState(tempUsers);

  return (
    <LobbyContext.Provider
      value={{
        players,
        setPlayers,
        styles: dynamicColors,
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
}
