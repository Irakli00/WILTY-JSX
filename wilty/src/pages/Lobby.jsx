{
  // import Timer from "../components/Timer";
  /* <Timer seconds={+10} timeRanOutStyle={{ color: "red" }}></Timer> */
}
import PlayerInLobby from "../components/PlayerInLobby";
import Button from "../components/Button";
import AddPlayerInput from "../components/AddPlayerInput";

function Lobby() {
  return (
    <section>
      <AddPlayerInput></AddPlayerInput>
      {/* <PlayerInLobby></PlayerInLobby> */}
      <Button className={"startGameBTN"}>Start a Game</Button>
    </section>
  );
}

export default Lobby;
