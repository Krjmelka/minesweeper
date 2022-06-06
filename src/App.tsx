import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import {Controls} from "./components/Controls/Controls";
import {PlayField} from "./components/PlayField/PlayField";
import {Popup} from "./components/Popup/Popup";
import {selectGameMode} from "./features/game/selectors";
import gameHelper from "./helpers/game.helper";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector(selectGameMode);

  useEffect(() => {
    gameHelper.initializeGame(mode, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="app-wrapper">
      <Controls />
      <PlayField />
      <Popup />
    </div>
  );
}

export default App;
