import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseUnit } from './baseUnit';

interface WarriorProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class Warrior extends BaseUnit implements IUnit {
  constructor(props: WarriorProps) {
    super({ ...props, type: UnitTypes.WARRIOR, name: 'W' });
  }

  attack(game: IGame, target: IPosition): IUnit {
    return this;
  }
}
