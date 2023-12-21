import { ReactNode } from "react";
import { Faction, UnitTypes, UnitLevels } from "../constants/general"
import { IGame } from "./IGame";
import { IPosition } from "./IPosition";

export interface IUnit {
    name: string;
    type: UnitTypes;
    position: IPosition
    initialPoints: number
    points: number
    cost: number
    faction: Faction;
    level: UnitLevels
    selected: boolean
    rotations: number[]

    // moves a unit from current position to target position
    // returns true if moves can be achived 
    move(game: IGame, target: IPosition): IUnit

    attack(game: IGame, target: IPosition): IUnit

    fuse(game: IGame, target: IPosition): IUnit

    select(): IUnit

    release(): IUnit

    render(): ReactNode
}