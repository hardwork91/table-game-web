import { IBoardBox } from "./IGame";

export interface IHealResult {
    origin: IBoardBox;
    target: IBoardBox;
    couldHeal: boolean;
}