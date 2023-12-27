import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IBoardBox } from '../models/IGame';
import { IHealResult } from '../models/IHealResult';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getDistance } from '../utils/utils';
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

  heal(target: IBoardBox): IHealResult {
    const targetUnit = target.unit!;
    const distance = getDistance(this.position, targetUnit.position);
    const canHeal = distance <= this.range;

    if (canHeal) {
      const healPoints = this.points - distance + 1;
      const targetUnitPoints = Math.min(
        targetUnit.initialPoints * targetUnit.level,
        targetUnit.points + healPoints
      );

      console.log('healPoints', healPoints);
      console.log('targetUnitPoints', targetUnitPoints);
      console.log('targetUnit.points', targetUnit.points);
      if (targetUnit.points < targetUnitPoints) {
        this.release();
        targetUnit.updatePoints(targetUnitPoints);

        return {
          origin: { position: this.position, unit: this },
          target: {
            position: target.position,
            unit: targetUnit,
          },
          couldHeal: true,
        };
      }
    }

    return super.heal(target);
  }
}
