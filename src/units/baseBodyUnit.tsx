import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IBoardBox } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getDistance } from '../utils/utils';
import { BaseUnit } from './baseUnit';

interface BaseUnitProps {
  type: UnitTypes;
  name: string;
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
  range: number;
}

export class BaseBodyUnit extends BaseUnit implements IUnit {
  constructor(props: BaseUnitProps) {
    super(props);
  }

  attack(target: IBoardBox): IAttackResult {
    const attackedUnit = target.unit!;
    const distance = getDistance(this.position, attackedUnit.position);
    const canAttack = distance <= this.range;
    if (canAttack) {
      const unitPoints = this.points;
      const attackedUnitPoints = attackedUnit.points;
      this.release();

      if (unitPoints > attackedUnitPoints) {
        // se gana el ataque
        this.updatePoints(Math.max(unitPoints - attackedUnitPoints, 0));
        const originLastPosition = this.position;
        this.updatePosition(attackedUnit.position);

        return {
          origin: { position: originLastPosition, unit: undefined },
          target: { position: target.position, unit: this },
          gainedPoints: attackedUnitPoints,
          couldAttack: true,
        };
      } else {
        if (unitPoints === attackedUnitPoints) {
          // si ambos se destruyen

          return {
            origin: { position: this.position, unit: undefined },
            target: { position: target.position, unit: undefined },
            gainedPoints: 0,
            couldAttack: true,
          };
        } else {
          // si se pierde el ataque
          attackedUnit.updatePoints(
            Math.max(attackedUnitPoints - unitPoints, 0)
          );
          return {
            origin: { position: this.position, unit: undefined },
            target: { position: target.position, unit: attackedUnit },
            gainedPoints: 0,
            couldAttack: true,
          };
        }
      }
    }

    return super.attack(target);
  }
}
