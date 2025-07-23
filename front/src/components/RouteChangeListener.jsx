import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { socket } from "../socket";
import { AppContext } from "../contexts/AppContext";

function RouteChangeListener() {
  const location = useLocation();
  const { useClientId } = useContext(AppContext);
  const id = useClientId();

  useEffect(() => {
    const regex = /^\/lobby\/[^/]+(?:\/game)?$/;

    if (!regex.test(location.pathname)) {
      socket.emit("user_disconnect", { id });
    } //disconects on every not matching link (works but fix this optimisation issuelatter)

    return () => {
      // optional cleanup
      socket.off("user_disconnect");
    };
  }, [location]);

  return null;
}

export default RouteChangeListener;
