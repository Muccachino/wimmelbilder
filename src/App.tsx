import "./App.css";
import Cursor from "./Cursor";
import Game from "./Game";
import NameForm from "./NameForm";
import { useState } from "react";
import { Highscore } from "./useHighscore";

function App() {
  const [player, setPlayer] = useState<Highscore>({
    id: "",
    name: "",
    time: 0,
  });

  const addPlayerName = (newName: string) => {
    setPlayer({ ...player, name: newName });
  };

  const addPlayerTime = (newTime: number) => {
    setPlayer({ ...player, time: newTime });
  };
  return (
    <>
      <NameForm addPlayer={addPlayerName} />
      <Game addTime={addPlayerTime} player={player} />
      <Cursor />
    </>
  );
}

export default App;
