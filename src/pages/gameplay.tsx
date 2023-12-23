import { FunctionComponent, useEffect, useState } from 'react';
import BoxContainer from '../components/BoxContainer';
import UnitComponent from '../components/Unit';
import {
  Faction,
  INITIAL_SCORE,
  MAX_LEVEL,
  MOVEMENTS_PER_TURN,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
} from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IBoardBox, IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { generateBoard, getBox, isAdyacent, updateBoard } from '../utils/utils';
import './index.css';

interface GameplayProps {}

const Gameplay: FunctionComponent<GameplayProps> = () => {
  const [game, setGame] = useState<IGame>();
  const [score, setScore] = useState<number>(INITIAL_SCORE);
  const [remainingMovements, setRemainingMovements] =
    useState<number>(MOVEMENTS_PER_TURN);
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();

  useEffect(() => {
    const board = generateBoard();
    setGame({
      enemyPoints: 30,
      board,
    });
  }, []);

  const setUpdateBoard = (boxes: IBoardBox[]) => {
    if (game) {
      let newBoard: IBoardBox[][] = game.board;
      boxes.forEach(({ position, unit }) => {
        newBoard = updateBoard(game.board, {
          position: position,
          unit,
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
        // si hago click sobre una unidad
        if (unit) {
          // si hice click sobre la unidad previamente seleccionada
          if (unit.position === selectedUnit.position) {
            releaseUnit(position, unit);
          } else {
            // si es una unidad de mi misma faccion
            if (unit.faction === Faction.ALLY) {
              // si son del mismo tipo y el mismo nivel de fusion
              if (
                unit.type === selectedUnit.type &&
                unit.level === selectedUnit.level &&
                unit.level !== MAX_LEVEL
              ) {
                fuse(position, selectedUnit, unit);
              }
            } else {
              // si es una unidad enemiga
              if (unit.type !== UnitTypes.KING) {
                attack(selectedUnit, unit);
              } else {
                const isKingUnprotected = false;
                //attack
              }
            }
          }
        } else {
          // si hago click sobre el campo vacio
          //move
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
    setUpdateBoard([{ position, unit: newUnit }]);
  };

  const releaseUnit = (position: IPosition, unit?: IUnit) => {
    if (unit) {
      const newUnit = unit.release();
      setSelectedUnit(undefined);
      setUpdateBoard([{ position, unit: newUnit }]);
    }
  };

  const move = (position: IPosition, unit: IUnit) => {
    const lastPosition = unit.position;
    const newUnit = unit.move(position);
    setUpdateBoard([{ position, unit: newUnit }, { position: lastPosition }]);
    finishMovement();
  };

  const fuse = (position: IPosition, unit: IUnit, targetUnit: IUnit) => {
    const lastPosition = unit.position;
    const newUnit = unit.fuse(position, targetUnit);
    setUpdateBoard([{ position, unit: newUnit }, { position: lastPosition }]);
    finishMovement();
  };

  const attack = (unit: IUnit, targetUnit: IUnit) => {
    const lastPosition = unit.position;
    const attackResult: IAttackResult = unit.attack({
      position: targetUnit.position,
      unit: targetUnit,
    });
    console.log('attackResult', attackResult);
    // origin: { position: this.position, unit: undefined },
    // target: { position: target.position, unit: this },
    // gainedPoints: attackedUnitPoints,
    setScore(score + attackResult.gainedPoints);
    setSelectedUnit(undefined); // siempre voy a deseleccionar la unidad despues de un ataque
    setUpdateBoard([attackResult.origin, attackResult.target]);
    finishMovement();
  };

  const finishMovement = () => {
    const nextRemainingMovements = remainingMovements - 1;
    setRemainingMovements(nextRemainingMovements);
    if (nextRemainingMovements == 0 || selectedUnit?.type === UnitTypes.KING) {
      finishTurn();
    }
  };

  const finishTurn = (unit?: IUnit) => {
    releaseUnit(selectedUnit!.position, unit);
    setRemainingMovements(0);
  };

  const renderMatchInfo = () => {
    return (
      <div className='match-info'>
        <div className='points'>
          <div className='title'>SCORE</div>
          <div className='value'>{score}</div>
        </div>
        <div className='remaining-movements'>
          <div className='title'>REMAINING MOVEMENTS</div>
          <div className='value'>{remainingMovements || '-'}</div>
        </div>
      </div>
    );
  };

  const renderBoard = () => {
    const boxStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff8f',
    };

    return (
      <div className='board-container'>
        <div
          style={{
            display: 'flex',
            gap: 70,
            textAlign: 'center',
            color: '#ffffff8f',
          }}
        >
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        {game?.board.map((row: IBoardBox[], rowIndex: number) => {
          return (
            <div className='row' key={`row-${rowIndex}`}>
              <div style={boxStyle}>{rowIndex}</div>
              {row.map((box: IBoardBox, columnIndex: number) => {
                const unit = box.unit;
                return (
                  <BoxContainer
                    key={`box-${rowIndex}-${columnIndex}`}
                    onClick={() =>
                      onBoardBoxClick({ row: rowIndex, column: columnIndex })
                    }
                  >
                    {/* {box.unit ? box.unit.render?.() : null} */}
                    {/* TODO castear box.unit a Unidad */}
                    {unit ? (
                      <UnitComponent
                        type={unit.type}
                        name={unit.name}
                        points={unit.points}
                        level={unit.level}
                        faction={unit.faction}
                        selected={unit.selected}
                        rotations={unit.rotations}
                      />
                    ) : null}
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
