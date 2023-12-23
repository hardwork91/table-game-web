import { IPosition } from "./IPosition";
import { IUnit } from "./IUnit";

export interface IBoardBox {
    position: IPosition;
    unit?: IUnit;
}

export interface IGame {
    enemyPoints: number;
    board: IBoardBox[][];
}