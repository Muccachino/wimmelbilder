import { useState } from "react";
import "./App.css";
import Cursor from "./Cursor";
import Game from "./Game";
import NameForm from "./NameForm";
import useHighscore, { Highscore } from "./useHighscore";
import HighscoreTable from "./HighscoreTable";

function App() {
  const [, addHighscore] = useHighscore();
  const [openNameForm, setOpenNameForm] = useState(true);
  const [openHighscore, setOpenHighscore] = useState(false);
  const [player, setPlayer] = useState<Highscore>({
    id: "",
    name: "",
    time: 0,
  });

  const setName = (newName: string) => {
    setPlayer({ ...player, name: newName });
    setOpenNameForm(false);
  };

  const setTime = (
    imagesFound: { image1: boolean; image2: boolean; image3: boolean },
    newTime: number
  ) => {
    console.log(newTime);
    console.log("Hier", imagesFound.image1);
    if (imagesFound.image1 && imagesFound.image2 && imagesFound.image3) {
      console.log(player);
      (addHighscore as (player: Highscore) => Promise<void>)({
        ...player,
        time: newTime,
      });
      setOpenHighscore(true);
    }
  };

  return (
    <>
      {openNameForm && <NameForm setName={setName} />}
      <Game gameWon={setTime} />
      <Cursor />
      {openHighscore && <HighscoreTable />}
    </>
  );
}

export default App;
