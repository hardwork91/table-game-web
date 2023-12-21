import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseUnit } from './baseUnit';

interface KingProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class King extends BaseUnit implements IUnit {
  constructor(props: KingProps) {
    super({ ...props, type: UnitTypes.KING, name: 'K' });
  }

  attack(game: IGame, target: IPosition): IUnit {
    return this;
  }
}
