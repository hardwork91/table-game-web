import { IPosition } from "./IPosition";
import { IUnit } from "./IUnit";

export interface IBoardBox {
    position: IPosition;
    unit?: IUnit;
}

export interface IGame {
    minePoints: number;
    enemyPoints: number;
    board: IBoardBox[][];
}