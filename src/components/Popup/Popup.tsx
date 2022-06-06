import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import gameHelper from "../../helpers/game.helper";
import { useDispatch, useSelector } from "react-redux";
import { selectGameMode, selectIsGameOver, selectIsWin, selectTimeSpendFormatted } from "../../features/game/selectors";

export const Popup = () => {
  const [open, setOpen] = useState(false);
  const gameMode = useSelector(selectGameMode)
  const timeSpend = useSelector(selectTimeSpendFormatted)
  const isGameOver = useSelector(selectIsGameOver)
  const isWin = useSelector(selectIsWin)
  const dispatch = useDispatch()

  const handleNewGame = () => {
    setOpen(false);
    gameHelper.initializeGame(gameMode, dispatch)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(isGameOver || isWin) {
        setOpen(true)
    }
  }, [isGameOver, isWin])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">
          {isWin ? 'You win' : 'Game Over'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Your time is: ${timeSpend}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleNewGame}>
            New Round
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
