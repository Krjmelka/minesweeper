import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {TLeaderboard, TLeaderboardData} from "../../types";
import {
  selectGameMode,
  selectIsShowLeaderBoard,
} from "../../features/game/selectors";
import {actions} from "../../features/game/gameSlice";
import gameHelper from "../../helpers/game.helper";

import "./LeaderBoard.scss";

const padNumber = (number: number, size: number) => {
  var s = String(number);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

export const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<
    Array<TLeaderboardData | null>
  >([]);

  const showLeaderBoard = useSelector(selectIsShowLeaderBoard);
  const mode = useSelector(selectGameMode);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(actions.setShowLeaderBoard(false));
  };

  useEffect(() => {
    if (showLeaderBoard) {
      const leaderBoard = gameHelper.getLocalResultData(
        "leaderboard"
      ) as TLeaderboard;
      const leaderBoardParsed = _.sortBy(
        leaderBoard.filter((data) => data.mode === mode),
        ["time"]
      );

      setLeaderBoard(
        Array.from({length: 10}, (_, i) => leaderBoardParsed[i] ?? null)
      );
    }
  }, [showLeaderBoard, mode]);

  return (
    <div className="leaderboard">
      <Dialog
        open={showLeaderBoard}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">{`Leaderboard - ${mode}`}</DialogTitle>
        <DialogContent>
          {!!leaderBoard.length && (
            <ol className="leaderboard__list">
              {leaderBoard.map((item, index) => (
                <li key={index}>
                  {item ? (
                    <span className="leaderboard__list-item">
                      <span className="leaderboard__list-item-name">
                        {item.name ? item.name : "unknown"}
                      </span>
                      <span className="leaderboard__list-item-date">
                        {moment(item.date).format("L")}
                      </span>
                      <span className="leaderboard__list-item-time">
                        {padNumber(item.time, 3)}
                      </span>
                    </span>
                  ) : (
                    "..."
                  )}
                </li>
              ))}
            </ol>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
