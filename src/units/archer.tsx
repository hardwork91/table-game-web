import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseUnit } from './baseUnit';

interface ArcherProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class Archer extends BaseUnit {
  constructor(props: ArcherProps) {
    super({ ...props, type: UnitTypes.ARCHER, name: 'A' });
  }

  attack(game: IGame, target: IPosition): IUnit {
    return this;
  }
}
