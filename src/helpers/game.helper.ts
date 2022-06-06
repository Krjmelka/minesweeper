import _ from "lodash";
import {gameRules} from "../constants";
import {actions} from "../features/game/gameSlice";
import {TAppDispatch} from "../store";
import {
  ECellType,
  EGameType,
  TFieldCell,
  TFieldData,
  TLeaderboard,
  TLeaderboardData,
  TPosition,
} from "../types";

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

class Game {
  private gameType: EGameType = EGameType.EASY;
  private dispatch: any = null;
  private minesData: TPosition[] = [];
  private playFieldData: TFieldData = [];

  initializeGame(type: EGameType, dispatch: TAppDispatch) {
    this.gameType = type;
    this.dispatch = dispatch;
    this.generateMines();
    this.generateField();
    dispatch(actions.setMode(type));
  }

  openCell(cellData: TFieldCell) {
    if (cellData.number === 0) {
      this.updateCell(cellData.position, {
        ...cellData,
        type: this.getCellType(cellData.position),
        userVisible: true,
      });
      const nearestCells = this.getNearestCells(cellData.position);
      const nearestCellsData = nearestCells
        .reduce<TFieldData>((acc, curr) => {
          const searchData = _.find(this.playFieldData, {position: curr});
          return searchData ? [...acc, searchData] : acc;
        }, [])
        .filter((data) => !data.userVisible);
      nearestCellsData.forEach((item) => {
        this.openCell(item);
      });
    } else {
      this.updateCell(cellData.position, {
        ...cellData,
        type: this.getCellType(cellData.position),
        userVisible: true,
      });
    }
  }

  flagCell(cellData: TFieldCell) {
    this.updateCell(cellData.position, {
      ...cellData,
      type:
        cellData.type === ECellType.FLAGGED
          ? this.getCellType(cellData.position)
          : ECellType.FLAGGED,
    });
  }

  showErrorsResult() {
    const errorCells = this.playFieldData.filter((cell) => {
      return (
        (cell.type === ECellType.FLAGGED && cell.number !== undefined) ||
        (cell.type === ECellType.MINED && cell.userVisible)
      );
    });
    errorCells.forEach((cell) => {
      this.updateCell(cell.position, {
        ...cell,
        isError: true,
      });
    });
  }

  getLocalResultData(type: 'name' | 'leaderboard') {
    if(type === 'leaderboard') {
      const storageData = localStorage.getItem('leaderboard')
      return storageData ? JSON.parse(storageData) as TLeaderboard : []
    } else {
      return localStorage.getItem('userName')
    }
  }

  setLocalResultData(resultData: Pick<TLeaderboardData, 'mode' | 'name' | 'time'>) {
    const previousData = this.getLocalResultData('leaderboard') as TLeaderboard;
    localStorage.setItem('leaderboard', JSON.stringify([...previousData, {
      ...resultData,
      date: new Date(),
    }]))
    localStorage.setItem('userName', resultData.name ? resultData.name : '')
  }

  private updateCell(cellPosition: TPosition, newData: TFieldCell) {
    const cellIndex = _.findIndex(this.playFieldData, {position: cellPosition});
    const updatedData = [...this.playFieldData];
    updatedData.splice(cellIndex, 1, newData);
    this.playFieldData = updatedData;
    this.dispatch(actions.setGameData(updatedData));
  }

  private generateField() {
    const gameFieldSize = gameRules[this.gameType].size;
    const playFieldData: TFieldData = [];
    for (let x = 1; x <= gameFieldSize.x; x++) {
      for (let y = 1; y <= gameFieldSize.y; y++) {
        const cellType = this.getCellType({x, y});
        playFieldData.push({
          position: {x, y},
          type: cellType,
          number:
            cellType === ECellType.MINED
              ? undefined
              : this.getCellNumber({x, y}),
          userVisible: false,
        });
      }
    }
    this.playFieldData = playFieldData;
    this.dispatch(actions.setGameData(playFieldData));
  }

  private getCellType({x, y}: TPosition): ECellType {
    return _.find(this.minesData, {x, y}) ? ECellType.MINED : ECellType.HIDDEN;
  }

  private getCellNumber({x, y}: TPosition) {
    const cellsToCheck = this.getNearestCells({x, y});
    return cellsToCheck.reduce<number>((acc, curr) => {
      return !!_.find(this.minesData, curr) ? acc + 1 : acc;
    }, 0);
  }

  private getNearestCells({x, y}: TPosition): TPosition[] {
    const xArr = [x - 1, x, x + 1];
    const yArr = [y - 1, y, y + 1];
    const nearestCells: TPosition[] = [];
    xArr.forEach((xItem) => {
      yArr.forEach((yItem) => {
        nearestCells.push({x: xItem, y: yItem});
      });
    });
    return nearestCells.filter(
      (position) => position.x !== x || position.y !== y
    );
  }

  private generateMinePosition(): TPosition {
    const minesCount = gameRules[this.gameType].size;
    return {
      x: random(1, minesCount.x),
      y: random(1, minesCount.y),
    };
  }
  private generateMines() {
    const minesData: TPosition[] = [];
    while (minesData.length < gameRules[this.gameType].minesCount) {
      const minePosition = this.generateMinePosition();
      if (!_.find(minesData, minePosition)) {
        minesData.push(minePosition);
      }
    }
    this.minesData = minesData;
  }
}

export default new Game();
