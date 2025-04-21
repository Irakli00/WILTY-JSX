import Card from "../components/Card";
import Timer from "../components/Timer";

function CardRead() {
  return (
    <>
      <Timer seconds={+10} timeRanOutStyle={{ color: "red" }}></Timer>
      <h1>
        <Card>story here</Card>
      </h1>
    </>
  );
}

export default CardRead;
