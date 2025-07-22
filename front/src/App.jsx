import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./socket";

import "./index.css";
import RootLayout from "./pages/RootLayout.jsx";
import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import JoinGame from "./pages/JoinGame";

// router.js or same file
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // <- route wrapper
    children: [
      { path: "", element: <StartPage /> },
      { path: "join_lobby", element: <JoinGame /> },
      { path: "lobby/:roomId", element: <Lobby /> },
      { path: "lobby/:roomId/game", element: <CardRead /> },
      { path: "lobby/:roomId/game-end", element: <GameEnd /> },
    ],
  },
  // { path: "*", element: <NotFoundPage /> },
]);

function App() {
  useEffect(() => {
    socket.emit("init");

    return () => {
      socket.off("init");
    };
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>;
    </>
  );
}

export default App;
