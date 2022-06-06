import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import gameHelper from "../../helpers/game.helper";
import {useDispatch, useSelector} from "react-redux";
import {
  selectGameMode,
  selectIsGameOver,
  selectIsWin,
  selectTimeSpend,
  selectTimeSpendFormatted,
} from "../../features/game/selectors";

export const Popup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const gameMode = useSelector(selectGameMode);
  const timeSpendFormatted = useSelector(selectTimeSpendFormatted);
  const timeSpend = useSelector(selectTimeSpend);
  const isGameOver = useSelector(selectIsGameOver);
  const isWin = useSelector(selectIsWin);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    if (isWin) {
      gameHelper.setLocalResultData({
        mode: gameMode,
        time: timeSpend,
        name: name,
      });
    }
  };

  useEffect(() => {
    if (isGameOver || isWin) {
      setOpen(true);
    }
  }, [isGameOver, isWin]);

  useEffect(() => {
    if (isWin) {
      const userName = gameHelper.getLocalResultData("name") as string | null;
      if (userName) {
        setName(userName);
      }
    }
  }, [isWin]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">
          {isWin ? "You win" : "Game Over"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Your time is: ${timeSpendFormatted}`}
          </DialogContentText>
          {isWin && (
            <TextField
              margin="dense"
              id="name"
              label="Your name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleClose();
              gameHelper.initializeGame(gameMode, dispatch);
            }}
          >
            New Round
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
