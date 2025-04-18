{
  // import Timer from "../components/Timer";
  /* <Timer seconds={+10} timeRanOutStyle={{ color: "red" }}></Timer> */
}
import AddPlayer from "../components/AddPlayer";
import AddPlayerInput from "../components/AddPlayerInput";
import Button from "../components/Button";

function Lobby() {
  return (
    <section className="lobby-section">
      <div className="loby-container">
        <AddPlayer className="player player-tobe player--1"></AddPlayer>
        <AddPlayerInput></AddPlayerInput>
      </div>
      <Button className={"startGameBTN"}>Start a Game</Button>
    </section>
  );
}

export default Lobby;
