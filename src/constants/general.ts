export enum Faction {
    ENEMY = "ENEMY",
    ALLY = "ALLY"
}

export enum UnitTypes {
    WARRIOR = "WARRIOR",
    ARCHER = "ARCHER",
    MAGE = "MAGE",
    KING = "KING"
}

export enum UnitLevels {
    LEVEL1 = 1,
    LEVEL2 = 2,
    LEVEL3 = 3,
}

export const UNIT_INITIAL_POINTS = {
    [UnitTypes.WARRIOR]: 5,
    [UnitTypes.ARCHER]: 3,
    [UnitTypes.MAGE]: 2,
    [UnitTypes.KING]: 20,
}

export const UNIT_COST = {
    [UnitTypes.WARRIOR]: 5,
    [UnitTypes.ARCHER]: 3,
    [UnitTypes.MAGE]: 2,
    [UnitTypes.KING]: 0,
}