import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "./firebase/firebaseInit";

type Highscore = {
  id: string;
  name: string;
  time: string;
};

export default function useHighscore() {
  const [highscore, setHighscore] = useState<Highscore[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, "highscore"), (snapshot) => {
      setHighscore(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Highscore))
      );
    });
  }, []);

  return [highscore];
}
