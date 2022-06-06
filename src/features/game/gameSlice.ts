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

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    mode: EGameType.EASY,
    flags: 0,
    gameData: [] as TFieldData,
    timeSpend: 0,
  },
  reducers: {
    setMode,
    setFlags,
    setGameData,
    increaseTimeSpend,
  },
});

export const actions = gameSlice.actions;

export default gameSlice.reducer;
