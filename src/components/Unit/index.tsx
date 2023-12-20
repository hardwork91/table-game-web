import classNames from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import { Faction, UnitLevels, UnitTypes } from '../../constants/general';
import BoxContainerComponent from '../BoxContainer';
import './index.css';

interface UnitComponentProps {
  name: string;
  points: number;
  level: UnitLevels;
  faction: Faction;
  type: UnitTypes;
  selected: boolean;
}

const UnitComponent: FunctionComponent<UnitComponentProps> = ({
  name,
  points,
  level,
  faction,
  type,
  selected,
}) => {
  return (
    <div
      className={classNames('unit', faction.toLowerCase(), `level-${level}`)}
    >
      {/* <div className={classNames('level', `level-${level}`)}>{level}</div> */}
      <div className={classNames('info', { selected })}>
        <div className='points'>{points}</div>
        <div className={classNames('type', type.toLowerCase())}>{name}</div>
      </div>

      {level >= 2 && (
        <div className={classNames('base', 'base-level-2', { selected })}></div>
      )}
      {level >= 3 && (
        <div className={classNames('base', 'base-level-3', { selected })}></div>
      )}
    </div>
  );
};

export default UnitComponent;
