import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import StartPage from "./pages/StartPage";
import Lobby from "./pages/Lobby";
import CardRead from "./pages/CardRead";
import GameEnd from "./pages/GameEnd";
import JoinGame from "./pages/JoinGame";

const router = createBrowserRouter([
  { path: "/", element: <StartPage></StartPage> },
  { path: "/lobby/:id", element: <Lobby></Lobby> },
  { path: "/join_lobby", element: <JoinGame></JoinGame> },
  { path: "/lobby/:id/game", element: <CardRead></CardRead> },
  { path: "/lobby/:id/game-end", element: <GameEnd></GameEnd> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
