import { Link } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect } from "react";

function StartPage({ onJoinLobby }) {
  const { useClientId } = useContext(AppContext);

  return (
    <section className="max-w-[70%] m-auto mt-[15dvh]">
      <div className="bg-secondary-blue p-[5dvh] flex flex-col justify-between gap-[5dvh] rounded-2xl">
        {/* -------------------   why is lobby manager even neccessary?  ----------------------------- */}

        {useEffect(() => {
          let id = sessionStorage.getItem("clientId");
          if (id) {
            fetch("http://localhost:5000/lobby_manager", {
              method: "POST",
              body: JSON.stringify({
                userId: id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            // .then((res) => res.json())
            // .then((data) => console.log(data))
            // .catch((error) => console.error("Error:", error));
          }
        }, [])}

        {/* ------------------------------------------------ */}

        <Link
          to={`/lobby/${useClientId()}`}
          className="bg-dark-yellow p-[7dvh] w-full text-[5rem] font-semibold text-dark-blue text-center rounded ease-in-out duration-300 hover:bg-greenish hover:text-white-tint"
        >
          PLAY
        </Link>
        <Link
          className="w-full p-[3dvh] text-4xl text-center bg-dark-red text-darker-gray font-semibold ease-in-out duration-300 hover:bg-silver-gray hover:text-dark-blue"
          to={"/join_lobby"}
          onClick={onJoinLobby}
        >
          Join a game
        </Link>
      </div>
    </section>
  );
}

export default StartPage;
