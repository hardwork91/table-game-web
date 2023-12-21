import { FunctionComponent, useEffect, useState } from 'react';
import BoxContainer from '../components/BoxContainer';
import UnitComponent from '../components/Unit';
import {
  Faction,
  MOVEMENTS_PER_TURN,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
} from '../constants/general';
import { IBoardBox, IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { generateBoard, getBox, isAdyacent, updateBoard } from '../utils/utils';
import './index.css';

interface GameplayProps {}

const Gameplay: FunctionComponent<GameplayProps> = () => {
  const [game, setGame] = useState<IGame>();
  const [remainingMovements, setRemainingMovements] =
    useState<number>(MOVEMENTS_PER_TURN);
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();

  useEffect(() => {
    const board = generateBoard();
    setGame({
      minePoints: 30,
      enemyPoints: 30,
      board,
    });
  }, []);

  const setUpdateBoard = (
    boxes: { position: IPosition; newUnit?: IUnit }[]
  ) => {
    if (game) {
      let newBoard: IBoardBox[][] = game.board;
      boxes.forEach(({ position, newUnit }) => {
        newBoard = updateBoard(game.board, {
          position: position,
          unit: newUnit,
        });
      });

      setGame({
        ...game,
        board: newBoard,
      });
    }
  };

  const onBoardBoxClick = (position: IPosition) => {
    if (remainingMovements! > 0) {
      const box = getBox(game?.board!, position);
      const unit = box.unit;
      if (!selectedUnit) {
        if (unit && unit.faction === Faction.ALLY) {
          selectUnit(position, unit);
        }
      } else {
        if (unit) {
          if (unit.position === selectedUnit.position) {
            releaseUnit(position, unit);
          } else {
            // if (unit.faction === Faction.ALLY) {
            //   const newUnits = unit.move(game!, position);
            // }
          }
          // const newUnits = unit.move(game!, position);
        } else {
          //mover
          const canMove =
            isAdyacent(selectedUnit.position, position) &&
            (selectedUnit.type !== UnitTypes.KING ||
              (selectedUnit.type === UnitTypes.KING &&
                remainingMovements === MOVEMENTS_PER_TURN));
          if (canMove) {
            move(position, selectedUnit);
          }
        }
      }
    }
  };

  const selectUnit = (position: IPosition, unit: IUnit) => {
    const newUnit = unit.select();
    setSelectedUnit(newUnit);
    setUpdateBoard([{ position, newUnit }]);
  };

  const releaseUnit = (position: IPosition, unit: IUnit) => {
    const newUnit = unit.release();
    setSelectedUnit(undefined);
    setUpdateBoard([{ position, newUnit }]);
  };

  const move = (position: IPosition, unit: IUnit) => {
    const lastPosition = unit.position;
    const newUnit = unit.move(game!, position);
    setUpdateBoard([{ position, newUnit }, { position: lastPosition }]);
    setSelectedUnit(selectedUnit);
    finishMovement();
  };

  const finishMovement = () => {
    const nextRemainingMovements = remainingMovements - 1;
    setRemainingMovements(nextRemainingMovements);
    if (nextRemainingMovements == 0 || selectedUnit?.type === UnitTypes.KING) {
      finishTurn();
    }
  };

  const finishTurn = () => {
    releaseUnit(selectedUnit!.position, selectedUnit!);
    setRemainingMovements(0);
  };

  const renderMatchInfo = () => {
    return (
      <div className='match-info'>
        <div className='points'>
          <div className='title'>SCORE</div>
          <div className='value'>{game?.minePoints}</div>
        </div>
        <div className='remaining-movements'>
          <div className='title'>REMAINING MOVEMENTS</div>
          <div className='value'>{remainingMovements || '-'}</div>
        </div>
      </div>
    );
  };

  const renderBoard = () => {
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

  const renderUnitStore = () => {
    return (
      <div className='unit-store'>
        <div className='store-title'>BUY</div>
        <UnitComponent
          name={'W'}
          points={UNIT_COST.WARRIOR}
          level={UnitLevels.LEVEL1}
          faction={Faction.ALLY}
          type={UnitTypes.WARRIOR}
          selected={false}
          rotations={[]}
        ></UnitComponent>
        <UnitComponent
          name={'A'}
          points={UNIT_COST.ARCHER}
          level={UnitLevels.LEVEL1}
          faction={Faction.ALLY}
          type={UnitTypes.ARCHER}
          selected={false}
          rotations={[]}
        ></UnitComponent>
        <UnitComponent
          name={'M'}
          points={UNIT_COST.MAGE}
          level={UnitLevels.LEVEL1}
          faction={Faction.ALLY}
          type={UnitTypes.MAGE}
          selected={false}
          rotations={[]}
        ></UnitComponent>
      </div>
    );
  };

  const renderKingBoosters = () => {
    return (
      <div className='king-boosters'>
        <BoxContainer />
        <BoxContainer />
        <BoxContainer />
        <div
          onClick={() => {
            if (remainingMovements === 0) {
              setRemainingMovements(MOVEMENTS_PER_TURN);
            }
          }}
        >
          REINICIAR TURNO
        </div>
        <div> REINICIAR JUEGO </div>
      </div>
    );
  };

  return (
    <div className='gameplay'>
      <div className='game'>
        {renderMatchInfo()}
        {renderBoard()}
        {renderKingBoosters()}
      </div>
      {renderUnitStore()}
    </div>
  );
};

export default Gameplay;
