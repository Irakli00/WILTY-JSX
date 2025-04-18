function PlayerInLobby({ declared = false }) {
  return (
    <div>
      {declared ? (
        <>
          <div className="img-align">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <div>
            <p>playerName</p>
          </div>
        </>
      ) : (
        <>
          <img src="../src/icons/userAdd.svg" alt="" width="25px" />
          <p>Add a player</p>
        </>
      )}
    </div>
  );
}

export default PlayerInLobby;
