import { useState } from "react";
import { Highscore } from "./useHighscore";

export default function usePlayer() {
  const [player, setPlayer] = useState<Highscore>({
    id: "",
    name: "",
    time: 0,
  });

  const addPlayerName = (newName: string) => {
    console.log(newName);
    setPlayer({ ...player, name: newName });
  };

  const addPlayerTime = (newTime: number) => {
    setPlayer({ ...player, time: newTime });
  };

  return [player, addPlayerName, addPlayerTime];
}
