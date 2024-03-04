import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useHighscore, { Highscore } from "./useHighscore";
import { Dialog } from "@mui/material";
import { db } from "./firebase/firebaseInit";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

interface Props {
  open: boolean;
}

export default function HighscoreTable({ open }: Props) {
  //const [highscore] = useHighscore();
  const [highscore, setHighscore] = useState<Highscore[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "highscore"),
      orderBy("time", "asc"),
      limit(10)
    );
    const getHightscore = async () => {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Highscore[];
      setHighscore(data);
    };
    getHightscore();
  }, []);

  return (
    <Dialog open={open}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(highscore as Highscore[]).map((player) => (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}
