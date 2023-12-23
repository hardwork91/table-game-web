import { Faction, UnitLevels, UnitTypes } from '../constants/general';
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
    super({ ...props, type: UnitTypes.KING, name: 'K', range: 1 });
  }
}
