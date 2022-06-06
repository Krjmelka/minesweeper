import React from "react";
import {useSelector, useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";

import {
  selectGameMode,
  selectPlayFlagsLeft,
  selectTimeSpendFormatted,
} from "../../features/game/selectors";
import {EGameType} from "../../types";
import {actions} from "../../features/game/gameSlice";

import "./Controls.scss";

export const Controls = () => {
  const mode = useSelector(selectGameMode);
  const flagsLeft = useSelector(selectPlayFlagsLeft);
  const timeSpend = useSelector(selectTimeSpendFormatted);
  const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(actions.setMode(event.target.value as EGameType));
  };
  return (
    <div className="controls">
      <div className="controls__select">
        <Box sx={{minWidth: 120}}>
          <FormControl fullWidth>
            <InputLabel id="mode-select-label">Mode</InputLabel>
            <Select
              labelId="mode-select-label"
              id="mode-select"
              value={mode}
              label="Mode"
              onChange={handleChange}
            >
              <MenuItem value={EGameType.EASY}>{EGameType.EASY}</MenuItem>
              <MenuItem value={EGameType.MEDIUM}>{EGameType.MEDIUM}</MenuItem>
              <MenuItem value={EGameType.HARD}>{EGameType.HARD}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="controls__flags">
        <span className="controls-icon">🚩</span>
        <span>{flagsLeft}</span>
      </div>
      <div className="controls__time">
        <span
          className="controls-leaderboard"
          onClick={() => {
            dispatch(actions.setShowLeaderBoard(true));
          }}
        >
          🧾
        </span>
        <span className="controls-icon">🕒</span>
        <span>{timeSpend}</span>
      </div>
    </div>
  );
};
