import {createSelector} from "@reduxjs/toolkit";
import {gameRules, CELL_SIZE} from "../../constants";
import {TRootState} from "../../store";
import {ECellType} from "../../types";

const padNumber = (number: number, size: number) => {
  var s = String(number);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

export const selectGameMode = (state: TRootState) => state.game.mode;
export const selectPlayFieldData = (state: TRootState) => state.game.gameData;
export const selectFlags = (state: TRootState) => state.game.flags;
export const selectTimeSpend = (state: TRootState) => state.game.timeSpend;
export const selectIsShowLeaderBoard = (state: TRootState) => state.game.showLeaderBoard;

export const selectPlayFieldViewBoxSize = createSelector(
  selectGameMode,
  (mode) =>
    `0 0 ${gameRules[mode].size.x * CELL_SIZE} ${
      gameRules[mode].size.y * CELL_SIZE
    }`
);

export const selectPlayFlagsLeft = createSelector(
  selectFlags,
  selectPlayFieldData,
  (flags, playFieldData) => {
    return (
      flags -
      playFieldData.filter((data) => data.type === ECellType.FLAGGED).length
    );
  }
);

export const selectTimeSpendFormatted = createSelector(
  selectTimeSpend,
  (timeSpend) => padNumber(timeSpend, 3)
);

export const selectIsGameOver = createSelector(
  selectPlayFieldData,
  (playFieldData) =>
    playFieldData.some(
      (cellData) => cellData.type === ECellType.MINED && cellData.userVisible
    )
);

export const selectIsWin = createSelector(
  selectPlayFieldData,
  selectGameMode,
  (playFieldData, mode) =>
    playFieldData.filter(
      (cellData) =>
        cellData.number === undefined && cellData.type === ECellType.FLAGGED
    ).length === gameRules[mode].minesCount &&
    playFieldData.filter((cellData) => !cellData.userVisible).length ===
      gameRules[mode].minesCount
);
