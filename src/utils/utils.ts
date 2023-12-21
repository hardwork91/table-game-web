import { Faction, UnitTypes } from "../constants/general";
import { IBoardBox } from "../models/IGame";
import { IPosition } from "../models/IPosition";
import { Archer } from "../units/archer";
import { King } from "../units/king";
import { Mage } from "../units/mage";
import { Warrior } from "../units/warrior";

export const generateBoard = () => {
    const board: IBoardBox[][] = [];
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

    const insertUnit = (
        type: UnitTypes,
        faction: Faction,
        position: IPosition
    ) => {
        const { row, column } = position;

        let unit;
        switch (type) {
            case UnitTypes.WARRIOR:
                unit = new Warrior({ position, faction });
                break;
            case UnitTypes.ARCHER:
                unit = new Archer({ position, faction });
                break;
            case UnitTypes.MAGE:
                unit = new Mage({ position, faction });
                break;
            case UnitTypes.KING:
                unit = new King({ position, faction });
                break;

            default:
                break;
        }

        board[row][column] = {
            position,
            unit,
        };
    };

    // allies
    insertUnit(UnitTypes.WARRIOR, Faction.ALLY, {
        row: 3,
        column: 1,
    });
    insertUnit(UnitTypes.ARCHER, Faction.ALLY, {
        row: 5,
        column: 3,
    });
    insertUnit(UnitTypes.MAGE, Faction.ALLY, {
        row: 4,
        column: 4,
    });
    insertUnit(UnitTypes.KING, Faction.ALLY, {
        row: 5,
        column: 2,
    });

    // enemies
    insertUnit(UnitTypes.WARRIOR, Faction.ENEMY, {
        row: 2,
        column: 2,
    });
    insertUnit(UnitTypes.ARCHER, Faction.ENEMY, {
        row: 1,
        column: 4,
    });
    insertUnit(UnitTypes.MAGE, Faction.ENEMY, {
        row: 0,
        column: 1,
    });
    insertUnit(UnitTypes.KING, Faction.ENEMY, {
        row: 0,
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

export const getRandomRotation = (max?: number, min?: number) => {
    const defaultMax = max || 10;
    const defaultMin = min || -10;
    const numeroAleatorioEntero = Math.floor(
        Math.random() * (defaultMax - defaultMin) + defaultMin
    );
    return numeroAleatorioEntero;
};