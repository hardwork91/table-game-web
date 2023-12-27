import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { BaseDistanceUnit } from './baseDistanceUnit';

interface MageProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class Mage extends BaseDistanceUnit implements IUnit {
  constructor(props: MageProps) {
    super({ ...props, type: UnitTypes.MAGE, name: 'M', range: 2 });
  }
}
