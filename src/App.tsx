import './App.css';
import Gameplay from './pages/gameplay';
import { IBoardBox } from './models/IGame';
import { IPosition } from './models/IPosition';
import { Warrior } from './units/warrior';
import { IUnit } from './models/IUnit';
import { Faction } from './constants/general';

function App() {
  let board: IBoardBox[][];

  const insertUnit = (unit: IUnit, position: IPosition) => {
    const { row, column } = position;
    board[row][column] = {
      position,
      unit,
    };
  };

  const generateBoard = () => {
    board = [];
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
    insertUnit(
      new Warrior({ position: { row: 0, column: 0 }, faction: Faction.ALLY }),
      {
        row: 0,
        column: 0,
      }
    );
    insertUnit(
      new Warrior({
        position: { row: 0, column: 1 },
        level: 2,
        faction: Faction.ALLY,
      }),
      {
        row: 0,
        column: 1,
      }
    );
    insertUnit(
      new Warrior({
        position: { row: 3, column: 3 },
        level: 3,
        faction: Faction.ALLY,
      }),
      {
        row: 3,
        column: 3,
      }
    );

    //enemies
    insertUnit(
      new Warrior({ position: { row: 1, column: 0 }, faction: Faction.ENEMY }),
      {
        row: 1,
        column: 0,
      }
    );
    insertUnit(
      new Warrior({
        position: { row: 1, column: 1 },
        level: 2,
        faction: Faction.ENEMY,
      }),
      {
        row: 1,
        column: 1,
      }
    );
    insertUnit(
      new Warrior({
        position: { row: 1, column: 2 },
        level: 3,
        faction: Faction.ENEMY,
      }),
      {
        row: 1,
        column: 2,
      }
    );
    return board;
  };

  // Generar la matriz e imprimir en consola para verificar
  board = generateBoard();
  
  return (
    <div className='App'>
      <Gameplay newGame={{ minePoints: 30, enemyPoints: 30, board }}></Gameplay>
    </div>
  );
}

export default App;
