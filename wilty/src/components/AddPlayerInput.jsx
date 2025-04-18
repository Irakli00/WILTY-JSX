import Button from "./Button";

function AddPlayerInput() {
  return (
    <div>
      <form>
        <input type="text" name="playerName" id="playerName" />
        <div>
          <Button>+</Button>
          <Button>-</Button>
        </div>
      </form>
    </div>
  );
}

export default AddPlayerInput;
