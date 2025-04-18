import Button from "./Button";

function AddPlayerForm() {
  return (
    <>
      <img src="../src/icons/userEdit.svg" alt="" width="25px" />
      <form>
        <input type="text" name="playerName" id="playerName" />
        <div>
          <Button>+</Button>
          <Button>-</Button>
        </div>
      </form>
    </>
  );
}

export default AddPlayerForm;
