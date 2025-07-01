import { Link } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

function StartPage() {
  const { useClientId } = useContext(AppContext);

  return (
    <section className="layout-container ">
      <div className="bg-secondary-blue min-h-full p-[5dvh] flex flex-col justify-between gap-[5dvh] ">
        <Link
          to={`/lobby/${useClientId()}`}
          className="bg-dark-yellow p-[7dvh] w-full text-[5rem] font-semibold text-dark-blue text-center rounded ease-in-out duration-300 hover:bg-greenish hover:text-white-tint"
        >
          PLAY
        </Link>
        <Link
          className="w-full p-[3dvh] text-4xl text-center bg-dark-red text-darker-gray font-semibold ease-in-out duration-300 hover:bg-silver-gray hover:text-dark-blue"
          to={"/join_lobby"}
        >
          Join a game
        </Link>
      </div>
    </section>
  );
}

export default StartPage;
