import { Faction, UnitLevels, UnitTypes } from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getDistance } from '../utils/utils';
import { BaseUnit } from './baseUnit';

interface ArcherProps {
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
}

export class Archer extends BaseUnit implements IUnit {
  constructor(props: ArcherProps) {
    super({ ...props, type: UnitTypes.ARCHER, name: 'A', range: 3 });
  }

  // attack(attackedUnit: IUnit): IAttackResult | undefined {
  //   const distance = getDistance(this.position, attackedUnit.position);
  //   const canAttack = distance <= this.range;

  //   if (canAttack) {
  //     const unitPoints = this.points - distance;
  //     const attackedUnitPoints = attackedUnit.points;

  //     if (unitPoints > 0) {
  //       attackedUnit.updatePoints(Math.max(attackedUnitPoints - unitPoints, 0));

  //       return {
  //         unit: this,
  //         attackedUnit: attackedUnit.points > 0 ? attackedUnit : undefined,
  //         gainedPoints: unitPoints,
  //       };
  //     }
  //   }
  //   return undefined;
  // }
}
