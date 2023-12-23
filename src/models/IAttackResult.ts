import { IBoardBox } from "./IGame";

export interface IAttackResult {
    origin: IBoardBox;
    target: IBoardBox
    gainedPoints: number
}