import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../socket";

function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    console.log("Location changed to:", location.pathname);
    socket.emit("location_change", { path: location.pathname });

    return () => {
      // optional cleanup
    };
  }, [location]);

  return null; // This component renders nothing
}

export default RouteChangeListener;
