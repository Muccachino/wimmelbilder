import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import usePlayer from "./usePlayer";

export default function NameForm() {
  const [, addPlayerName] = usePlayer();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState("");

  return (
    <Dialog open={open}>
      <DialogTitle>Player Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a player name for the highscore
        </DialogContentText>
        <TextField
          variant="outlined"
          id="name-input"
          label="Player Name"
          type="text"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            (addPlayerName as (newName: string) => void)(formData);
          }}
        >
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}
