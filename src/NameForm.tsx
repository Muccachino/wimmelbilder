import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  setName: (name: string) => void;
}

export default function NameForm({setName}: Props) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState("");

  return (
    <Dialog open={open}>
      <DialogTitle>Player Name</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter a player name for the highscore</DialogContentText>
        <TextField
          variant="outlined"
          id="name-input"
          label="Player Name"
          type="text"
          onChange={(e) => setFormData(e.target.value)}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => {setOpen(false); setName(formData)}}>
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
      
  )
}