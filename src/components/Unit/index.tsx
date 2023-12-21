import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Faction, UnitLevels, UnitTypes } from '../../constants/general';
import './index.css';

interface UnitComponentProps {
  name: string;
  points: number;
  level: UnitLevels;
  faction: Faction;
  type: UnitTypes;
  selected: boolean;
  rotations: number[];
}

const UnitComponent: FunctionComponent<UnitComponentProps> = ({
  name,
  points,
  level,
  faction,
  type,
  selected,
  rotations,
}) => {
  return (
    <div
      className={classNames('unit', faction.toLowerCase(), `level-${level}`)}
    >
      <div
        className={classNames('info', { selected })}
        style={{ transform: `rotate(${rotations[0]}deg)` }}
      >
        <div className='points'>{points}</div>
        <div className={classNames('type', type.toLowerCase())}>{name}</div>
      </div>

      {level >= 2 && (
        <div
          className={classNames('base', 'base-level-2', { selected })}
          style={{ transform: `rotate(${rotations[1]}deg)` }}
        ></div>
      )}
      {level >= 3 && (
        <div
          className={classNames('base', 'base-level-3', { selected })}
          style={{ transform: `rotate(${rotations[2]}deg)` }}
        ></div>
      )}
    </div>
  );
};

export default UnitComponent;
