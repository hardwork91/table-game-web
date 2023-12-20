import { IBoardBox } from "../models/IGame";
import { IPosition } from "../models/IPosition";

export const getBox = (board: IBoardBox[][], position: IPosition) => {
    return board[position.row][position.column]
}

export const updateBoard = (board: IBoardBox[][], box: IBoardBox) => {
    board[box.position.row][box.position.column] = box
    return board
}

export const isAdyacent = (origen: IPosition, target: IPosition): boolean => {
    const diffX = Math.abs(origen.row - target.row);
    const diffY = Math.abs(origen.column - target.column);
    return diffX <= 1 && diffY <= 1
}