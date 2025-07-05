import { useEffect, useRef, useState } from "react";

function PlayerForm({
  defaultStyle = null,
  onCloseForm,
  autoFocus = true,
  submitBtnValue = "Set",
  resetBtnValue = "X",
  onDataRecieved,
  formStyles = null,
  textInputStyles = null,
  submitInputStyles = null,
  resetInputStyles = null,
}) {
  const [data, setData] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    autoFocus && inputRef.current.focus();
  }, []);

  return (
    <div className="player" style={defaultStyle}>
      <form
        className={`${formStyles}`}
        onSubmit={(e) => {
          e.preventDefault();
          data && onCloseForm(false);
        }}
      >
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          className={`${textInputStyles}`}
          ref={inputRef}
          type="text"
          name="playerName"
          id="playerName"
        />
        <div>
          <input
            type="submit"
            className={`${submitInputStyles}`}
            value={submitBtnValue}
            onClick={() => onDataRecieved(data)}
          />
          <input
            type="reset"
            className={`${resetInputStyles}`}
            value={resetBtnValue}
            onClick={onCloseForm}
          />
          {/* bug if first open */}
        </div>
      </form>
    </div>
  );
}

export default PlayerForm;
