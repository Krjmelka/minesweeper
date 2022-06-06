import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {Controls} from "./components/Controls/Controls";
import { LeaderBoard } from "./components/LeaderBoard/LeaderBoard";
import {PlayField} from "./components/PlayField/PlayField";
import {Popup} from "./components/Popup/Popup";
import {selectGameMode, selectIsGameOver} from "./features/game/selectors";
import gameHelper from "./helpers/game.helper";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector(selectGameMode);
  const isGameOver = useSelector(selectIsGameOver);

  useEffect(() => {
    gameHelper.initializeGame(mode, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if(isGameOver){
      gameHelper.showErrorsResult()
    }
  }, [isGameOver])

  return (
    <div className="app-wrapper">
      <Controls />
      <PlayField />
      <Popup />
      <LeaderBoard />
    </div>
  );
}

export default App;
