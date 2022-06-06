import {configureStore} from "@reduxjs/toolkit";
import gameReducer from "./features/game/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
