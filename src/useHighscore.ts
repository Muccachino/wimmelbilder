import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase/firebaseInit";

export type Highscore = {
  id: string;
  name: string;
  time: number;
};

export default function useHighscore() {
  const [highscore, setHighscore] = useState<Highscore[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "highscore"),
      orderBy("time", "asc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      setHighscore(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Highscore))
      );
    });
  }, []);

  const addHighscore = async (player: Highscore) => {
    console.log(player);
    const docRef = collection(db, "highscore");
    await addDoc(docRef, player);
  };

  return [highscore, addHighscore];
}
