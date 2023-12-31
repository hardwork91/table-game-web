import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IBoardBox } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getDistance } from '../utils/utils';
import { BaseUnit } from './baseUnit';

interface BaseUnitProps {
  type: UnitTypes;
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
  range: number;
}

export class BaseDistanceUnit extends BaseUnit implements IUnit {
  constructor(props: BaseUnitProps) {
    super(props);
  }

  attack(target: IBoardBox): IAttackResult {
    const attackedUnit = target.unit!;
    const distance = getDistance(this.position, attackedUnit.position);
    const canAttack = distance <= this.range;
    if (canAttack) {
      const unitPoints = this.points - distance + 1;
      const attackedUnitPoints = attackedUnit.points;

      if (unitPoints > 0) {
        this.release();
        attackedUnit.updatePoints(Math.max(attackedUnitPoints - unitPoints, 0));

        return {
          origin: { position: this.position, unit: this },
          target: {
            position: target.position,
            unit: attackedUnit.points > 0 ? attackedUnit : undefined,
          },
          gainedPoints: unitPoints,
          couldAttack: true,
        };
      }
    }

    return super.attack(target);
  }
}
