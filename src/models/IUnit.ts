import { ReactNode } from "react";
import { Faction, UnitTypes, UnitLevels } from "../constants/general"
import { IAttackResult } from "./IAttackResult";
import { IBoardBox } from "./IGame";
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
    range: number

    // moves a unit from current position to target position
    // returns true if moves can be achived 
    move(target: IPosition): IUnit

    attack(target: IBoardBox): IAttackResult

    updatePoints(points: number): void

    updatePosition(position: IPosition): void

    fuse(target: IPosition, consumedUnit: IUnit): IUnit

    select(): IUnit

    release(): IUnit

    render(): ReactNode
}