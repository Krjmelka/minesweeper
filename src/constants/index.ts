import { EGameType, TGameRules } from "../types";

export const CELL_SIZE = 15;

export const gameRules: TGameRules = {
    [EGameType.EASY]: {
        size: {
            x: 10,
            y: 8,
        },
        minesCount: 10
    },
    [EGameType.MEDIUM]: {
        size: {
            x: 18,
            y: 14,
        },
        minesCount: 40,
    },
    [EGameType.HARD]: {
        size: {
            x: 24,
            y: 20,
        },
        minesCount: 99,
    }
}