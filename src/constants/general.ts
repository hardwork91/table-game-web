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

export const GAME_CONFIG = {
    MAX_LEVEL: UnitLevels.LEVEL3,
    MOVEMENTS_PER_TURN: 3,
    INITIAL_SCORE: 3,
    STORE: {
        /* define si al comprar una unidad y ponerla en el terreno, se cuenta como un movimiento */
        SHOULD_BUY_UNITS_COUNT_AS_MOVEMENTS: true,
        /* define si durante el juego hay solo una cantidad maxima de unidades de cada tipo que se pueden comprar 
        ejemplo solo 5 guerreros. al comprar un guerrero y ponerlo en el; campo, solo quedarian 4 para comprar
        Al ser eliminado un guerrero de tu faccion, este pasa a estar disponible en la tienda nuevamente */
        ARE_STORE_UNITS_STOCKABLE: true,
        STORE_UNIT_STOCK: {
            [UnitTypes.WARRIOR]: 5,
            [UnitTypes.ARCHER]: 4,
            [UnitTypes.MAGE]: 3,
        }
    }
}

export const UNIT_NAMES = {
    [UnitTypes.WARRIOR]: "W",
    [UnitTypes.ARCHER]: "A",
    [UnitTypes.MAGE]: "M",
    [UnitTypes.KING]: "K",
}

export const UNIT_INITIAL_POINTS = {
    [UnitTypes.WARRIOR]: 5,
    [UnitTypes.ARCHER]: 4,
    [UnitTypes.MAGE]: 3,
    [UnitTypes.KING]: 20,
}

export const UNIT_COST = {
    [UnitTypes.WARRIOR]: 5,
    [UnitTypes.ARCHER]: 3,
    [UnitTypes.MAGE]: 2,
    [UnitTypes.KING]: 0,
}