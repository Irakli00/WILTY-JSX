import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./socket";

import "./index.css";

import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import JoinGame from "./pages/JoinGame";

const router = createBrowserRouter([
  { path: "/", element: <StartPage></StartPage> },
  { path: "/lobby/:roomId", element: <Lobby></Lobby> },
  { path: "/join_lobby", element: <JoinGame></JoinGame> },
  { path: "/lobby/:roomId/game", element: <CardRead></CardRead> },
  { path: "/lobby/:roomId/game-end", element: <GameEnd></GameEnd> },

  // { path: "*", element: <NotFoundPage /> },
]);

function App() {
  useEffect(() => {
    socket.emit("init");

    return () => {
      socket.off("init");
    };
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
