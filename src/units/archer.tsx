import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseDistanceUnit } from './baseDistanceUnit';

interface ArcherProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class Archer extends BaseDistanceUnit implements IUnit {
  constructor(props: ArcherProps) {
    super({ ...props, type: UnitTypes.ARCHER, name: 'A', range: 3 });
  }
}
