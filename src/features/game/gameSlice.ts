import {createSlice, CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {gameRules} from "../../constants";
import {EGameType, TFieldData, TGameSlice} from "../../types";

const setMode: CaseReducer<TGameSlice, PayloadAction<EGameType>> = (
  state,
  action
) => {
  state.mode = action.payload;
  state.flags = gameRules[action.payload].minesCount;
  state.timeSpend = 0;
};
const setFlags: CaseReducer<TGameSlice, PayloadAction<number>> = (
  state,
  action
) => {
  state.flags = action.payload;
};
const setGameData: CaseReducer<TGameSlice, PayloadAction<TFieldData>> = (
  state,
  action
) => {
  state.gameData = action.payload;
};
const increaseTimeSpend: CaseReducer<TGameSlice> = (
  state,
  action
) => {
  state.timeSpend += 1;
};
const setShowLeaderBoard: CaseReducer<TGameSlice, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.showLeaderBoard = action.payload;
};

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    mode: EGameType.EASY,
    flags: 0,
    gameData: [] as TFieldData,
    timeSpend: 0,
    showLeaderBoard: false,
  },
  reducers: {
    setMode,
    setFlags,
    setGameData,
    increaseTimeSpend,
    setShowLeaderBoard,
  },
});

export const actions = gameSlice.actions;

export default gameSlice.reducer;
