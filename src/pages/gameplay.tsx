import { FunctionComponent, useEffect, useState } from 'react';
import BoxContainer from '../components/BoxContainer';
import { Faction } from '../constants/general';
import { IBoardBox, IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getBox, isAdyacent, updateBoard } from '../utils/utils';
import './index.css';

interface GameplayProps {
  newGame: IGame;
}

const Gameplay: FunctionComponent<GameplayProps> = ({ newGame }) => {
  const [game, setGame] = useState<IGame>();
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();

  useEffect(() => {
    setGame(newGame);
  }, [newGame]);

  const setUpdateBoard = (target: IPosition, newUnit?: IUnit) => {
    if (game) {
      const newBoard = updateBoard(game.board, {
        position: target,
        unit: newUnit,
      });

      setGame({
        minePoints: game.minePoints,
        enemyPoints: game.enemyPoints,
        board: newBoard,
      });
    }
  };

  const onBoardBoxClick = (position: IPosition) => {
    const box = getBox(game?.board!, position);
    const unit = box.unit;
    if (!selectedUnit) {
      if (unit && unit.faction === Faction.ALLY) {
        const newUnit = unit.select();
        setSelectedUnit(newUnit);
        setUpdateBoard(position, newUnit);
      }
    } else {
      if (unit) {
        if (unit.position === selectedUnit.position) {
          const newUnit = unit.release();
          setSelectedUnit(undefined);
          setUpdateBoard(position, newUnit);
        } else {
          // if (unit.faction === Faction.ALLY) {
          //   const newUnits = unit.move(game!, position);
          // }
        }
        // const newUnits = unit.move(game!, position);
      } else {
        //mover
        const canMove = isAdyacent(selectedUnit.position, position);
        if (canMove) {
          const newUnit = selectedUnit.move(game!, position);
          setSelectedUnit(selectedUnit);
          setUpdateBoard(selectedUnit.position);
          setUpdateBoard(position, newUnit);
        }
      }
    }
  };

  return (
    <div className='board-container'>
      {game?.board.map((row: IBoardBox[], rowIndex: number) => {
        return (
          <div className='row'>
            {row.map((box: IBoardBox, columnIndex: number) => {
              return (
                <BoxContainer
                  key={`box-${rowIndex}-${columnIndex}`}
                  onClick={() =>
                    onBoardBoxClick({ row: rowIndex, column: columnIndex })
                  }
                >
                  {box.unit ? box.unit.render() : null}
                </BoxContainer>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Gameplay;
