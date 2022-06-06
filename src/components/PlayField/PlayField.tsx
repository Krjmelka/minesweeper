import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../features/game/gameSlice";
import {
  selectGameMode,
  selectPlayFieldData,
  selectPlayFieldViewBoxSize,
  selectIsGameOver,
  selectIsWin,
} from "../../features/game/selectors";
import gameHelper from "../../helpers/game.helper";
import {ECellType} from "../../types";
import {FieldCell} from "../FieldCell/FieldCell";
import "./PlayField.scss";

export const PlayField = () => {
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  );
  const viewBoxSize = useSelector(selectPlayFieldViewBoxSize);
  const fieldData = useSelector(selectPlayFieldData);
  const gameMode = useSelector(selectGameMode);
  const isGameOver = useSelector(selectIsGameOver);
  const isWin = useSelector(selectIsWin);

  const dispatch = useDispatch();

  const handleGameStart = () => {
    const timer = setInterval(() => {
      dispatch(actions.increaseTimeSpend());
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [timer]);

  useEffect(() => {
    if ((isGameOver || isWin) && timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [isGameOver, timer, isWin]);

  if (!fieldData.length) {
    return null;
  }

  return (
    <div className="play-field">
      <svg className="play-field-svg" viewBox={viewBoxSize}>
        {fieldData.map((cell) => (
          <FieldCell
            key={`${cell.position.x}-${cell.position.y}`}
            onClick={(event) => {
              if (!timer) {
                handleGameStart();
              }
              if (cell.type === ECellType.FLAGGED || isGameOver || isWin) {
                return;
              }
              if (!cell.userVisible) {
                gameHelper.openCell(cell);
              }
            }}
            onContextMenu={(event) => {
              event.preventDefault();
              if (isGameOver || isWin) {
                return;
              }
              if (!cell.userVisible) {
                gameHelper.flagCell(cell);
              }
              if (!timer) {
                handleGameStart();
              }
            }}
            {...cell}
          />
        ))}
      </svg>
    </div>
  );
};
