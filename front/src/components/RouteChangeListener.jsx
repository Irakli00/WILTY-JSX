import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

import { socket } from "../socket";
import { AppContext } from "../contexts/AppContext";

function RouteChangeListener() {
  const location = useLocation();
  const { useClientId } = useContext(AppContext);
  const id = useClientId();

  useEffect(() => {
    const handleUnload = () => {
      socket.emit("user_disconnect", { id });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(() => {
    const regex = /^\/lobby\/[^/]+(?:\/game)?$/;

    if (!regex.test(location.pathname)) {
      socket.emit("user_disconnect", { id });
      console.log("disced");
    }

    return () => {
      socket.off("user_disconnect");
    };
  }, [location, id]);

  return null;
}

export default RouteChangeListener;
