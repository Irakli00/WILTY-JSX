import { Link } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

function StartPage() {
  const { useClientId } = useContext(AppContext);

  return (
    <section className="layout-container ">
      <div className="min-h-full bg-gradient-to-br from-secondary-blue to-blue-500 p-[5dvh] flex flex-col items-center justify-center rounded-2xl">
        <div className="w-full backdrop-blur-md rounded-2xl flex flex-col justify-center gap-[5dvh] ">
          <Link
            to={`/lobby/${useClientId()}`}
            className="bg-dark-yellow p-[7dvh] w-full text-[5rem] font-semibold text-dark-blue text-center rounded-2xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:bg-greenish hover:text-white-tint hover:shadow-2xl"
          >
            PLAY
          </Link>
          <Link
            to="/join_lobby"
            className="w-full p-[3dvh] text-4xl text-center bg-dark-red text-darker-gray font-semibold rounded-2xl shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:bg-silver-gray hover:text-dark-blue hover:shadow-xl"
          >
            Join a game
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StartPage;
