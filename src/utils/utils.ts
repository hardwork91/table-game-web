import { Faction, UnitLevels, UnitTypes } from "../constants/general";
import { IBoardBox } from "../models/IGame";
import { IPosition } from "../models/IPosition";
import { Archer } from "../units/archer";
import { King } from "../units/king";
import { Mage } from "../units/mage";
import { Warrior } from "../units/warrior";

export const insertUnit = (
    board: IBoardBox[][],
    type: UnitTypes,
    faction: Faction,
    position: IPosition,
    level: UnitLevels = UnitLevels.LEVEL1
) => {
    const { row, column } = position;

    let unit;
    switch (type) {
        case UnitTypes.WARRIOR:
            unit = new Warrior({ position, faction, level });
            break;
        case UnitTypes.ARCHER:
            unit = new Archer({ position, faction, level });
            break;
        case UnitTypes.MAGE:
            unit = new Mage({ position, faction, level });
            break;
        case UnitTypes.KING:
            unit = new King({ position, faction, level });
            break;

        default:
            break;
    }

    board[row][column] = {
        position,
        unit,
    };

    return board
};

export const generateBoard = () => {
    let board: IBoardBox[][] = [];
    for (let i = 0; i < 6; i++) {
        const newRow = [];
        for (let j = 0; j < 6; j++) {
            const position: IPosition = {
                row: i,
                column: j,
            };
            newRow.push({ position });
        }
        board.push(newRow);
    }



    // allies
    board = insertUnit(board, UnitTypes.WARRIOR, Faction.ALLY, {
        row: 3,
        column: 2,
    });
    board = insertUnit(board, UnitTypes.WARRIOR, Faction.ALLY, {
        row: 4,
        column: 2,
    });
    board = insertUnit(board, UnitTypes.ARCHER, Faction.ALLY, {
        row: 5,
        column: 3,
    });
    board = insertUnit(board, UnitTypes.MAGE, Faction.ALLY, {
        row: 4,
        column: 4,
    });
    board = insertUnit(board, UnitTypes.KING, Faction.ALLY, {
        row: 5,
        column: 2,
    });

    // enemies
    board = insertUnit(board, UnitTypes.WARRIOR, Faction.ENEMY, {
        row: 2,
        column: 2,
    });
    board = insertUnit(board, UnitTypes.WARRIOR, Faction.ENEMY, {
        row: 2,
        column: 1,
    }, UnitLevels.LEVEL2);
    // insertUnit(board,UnitTypes.ARCHER, Faction.ENEMY, {
    //     row: 1,
    //     column: 4,
    // });
    board = insertUnit(board, UnitTypes.MAGE, Faction.ENEMY, {
        row: 0,
        column: 1,
    });
    board = insertUnit(board, UnitTypes.KING, Faction.ENEMY, {
        row: 2,
        column: 3,
    });

    return board;
};

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

export const getDistance = (origen: IPosition, target: IPosition): number => {
    const diffX = Math.abs(origen.row - target.row);
    const diffY = Math.abs(origen.column - target.column);
    return Math.max(diffX, diffY)
}

export const getRandomRotation = (max?: number, min?: number) => {
    const defaultMax = max || 10;
    const defaultMin = min || -10;
    const numeroAleatorioEntero = Math.floor(
        Math.random() * (defaultMax - defaultMin) + defaultMin
    );
    return numeroAleatorioEntero;
};

export const hasUnitsArround = (board: IBoardBox[][], target: IPosition) => {
    const { row, column } = target
    const targetUnit = board[row][column].unit!

    const positionsToCheck = [
        { row: row - 1, column: column - 1 }, { row: row - 1, column: column }, { row: row - 1, column: column + 1 },
        { row, column: column - 1 }, { row, column: column + 1 },
        { row: row + 1, column: column - 1 }, { row: row + 1, column: column }, { row: row + 1, column: column + 1 }
    ]

    let hasUnitArraund = false

    positionsToCheck.forEach(position => {
        const box = board![position.row]?.[position.column]
        if (box) {
            hasUnitArraund = hasUnitArraund || box.unit?.faction === targetUnit.faction;
        }
    });
    return hasUnitArraund
}