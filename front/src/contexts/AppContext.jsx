import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";

export const AppContext = createContext();

const dynamicColors = [
  {
    border: "#e2e8f0", // light slate
    background: "#1e3a8a", // deep blue
    color: "#f8fafc", // near white
  },
  {
    border: "#0f172a", // dark navy
    background: "#22d3ee", // cyan
    color: "#0f172a", // contrast dark text
  },
  {
    border: "#dc2626", // red
    background: "#facc15", // yellow
    color: "#1c1917", // charcoal
  },
  {
    border: "#f8fafc",
    background: "#7e22ce", // purple
    color: "#f8fafc",
  },
  {
    border: "#facc15",
    background: "#dc2626",
    color: "#facc15",
  },
  {
    border: "#22d3ee",
    background: "#f8fafc",
    color: "#0f172a",
  },
];
// const dynamicColors = [
//   {
//     border: "#eeedee",
//     background: "#1a6578",
//     color: "#eeedee",
//   },
//   {
//     border: "#011e2e",
//     background: "#2dd14bee",
//     color: "#011e2e",
//   },
//   {
//     border: "#990a0e", //
//     background: "#db9a26",
//     color: "#990a0e",
//   },
//   {
//     border: "#eeedee",
//     background: "#6c1973",
//     color: "#eeedee",
//   },
//   {
//     border: "#db9a26",
//     background: "#990a0e",
//     color: "#db9a26",
//   },
//   {
//     border: "#2dd14bee",
//     background: "#eeedee",
//     color: "#2dd14bee",
//   },
// ];

const formStyles = {
  form: "flex gap-4 items-center bg-transparent p-4 rounded-xl shadow-md backdrop-blur-sm text-2xl",
  textInput:
    "bg-white/10 border-2 border-white/30 text-white placeholder-white/60 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 text-2xl",
  submitInput:
    "cursor-pointer bg-white text-green-600 mr-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-500 hover:text-white transition duration-300 ease-in-out text-2xl",
  resetInput:
    "cursor-pointer bg-red-500 px-4 py-2 rounded-lg text-white font-semibold shadow hover:bg-red-700 transition duration-300 ease-in-out text-2xl",
};

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

function useUpdateRoom(roomId, players) {
  const { setPlayers, setHostId } = useContext(AppContext);

  useEffect(() => {
    if (!roomId) return;

    const handleRoomsInfo = (data) => {
      const playersInfo = data.userIds.map((_, index) => ({
        roomId: data.roomId,
        id: data.userIds[index],
        nickName: data.userNicknames[index] || "No Username",
        story: data.userStories[index],
      }));

      if (data.roomId === roomId && data.roomId !== null) {
        setPlayers(playersInfo);
        setHostId(data.userIds[0]);
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
  const [randomStories, setRandomStories] = useState([
    "I once had to translate between two angry customers at a supermarket who were arguing over a dropped watermelon.",
    "For about a year, I carried a teaspoon in my pocket just in case. It came in handy multiple times.",
    "For a whole summer I fed a goose at my local park every day at the same time. One day it followed me home and I had to distract it with a flapjack to escape.",
  ]);
  const [hostId, setHostId] = useState(null);
  const SECONDS_IN_TURN = 10;

  return (
    <AppContext.Provider
      value={{
        players,
        setPlayers,
        useClientId,
        isInLobby,
        setIsInLobby,
        hostId,
        setHostId,
        turn,
        SECONDS_IN_TURN,
        setTurn,
        randomStories,
        setRandomStories,
        styles: dynamicColors,
        formStyles,

        useUpdateRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
