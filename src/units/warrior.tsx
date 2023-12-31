import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseBodyUnit } from './baseBodyUnit';

interface WarriorProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
  rotations?: number[];
}

export class Warrior extends BaseBodyUnit implements IUnit {
  constructor(props: WarriorProps) {
    super({ ...props, type: UnitTypes.WARRIOR, range: 1 });
  }
}
