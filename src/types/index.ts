export enum EGameType {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export type TGameRules = Record<EGameType, TGameData>;

export type TGameData = {
  size: TFieldSize;
  minesCount: number;
};

export type TPosition = {
  x: number;
  y: number;
};

export type TFieldSize = TPosition;

export enum ECellType {
  HIDDEN = "hidden",
  FLAGGED = "flagged",
  EMPTY = "empty",
  NUMBER = "number",
  MINED = "mined",
}

export type TFieldCell = {
  position: TPosition;
  type: ECellType;
  userVisible: boolean;
  number?: number;
  isError?: boolean;
};

export type TFieldData = TFieldCell[];

export type TGameSlice = {
  mode: EGameType;
  flags: number;
  gameData: TFieldData;
  timeSpend: number;
  showLeaderBoard: boolean;
};

export type TLeaderboardData = {
  name: string;
  time: number;
  date: Date;
  mode: EGameType;
};

export type TLeaderboard = TLeaderboardData[];
