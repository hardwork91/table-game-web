import { ReactNode } from 'react';
import UnitComponent from '../components/Unit';
import {
  Faction,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
  UNIT_INITIAL_POINTS,
  UNIT_NAMES,
} from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { IBoardBox } from '../models/IGame';
import { getRandomRotation } from '../utils/utils';
import { IHealResult } from '../models/IHealResult';

interface BaseUnitProps {
  type: UnitTypes;
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
  range: number;
}

export class BaseUnit implements IUnit {
  type: UnitTypes;
  position: IPosition;
  initialPoints: number;
  points: number;
  cost: number;
  faction: Faction;
  level: UnitLevels;
  selected: boolean;
  rotations: number[];
  range: number;
  name: string;

  constructor(props: BaseUnitProps) {
    const { type, position, faction, points, level, range } = props;
    this.type = type;
    this.name = UNIT_NAMES[this.type];
    this.position = position;
    this.initialPoints = UNIT_INITIAL_POINTS[this.type];
    this.level = level || UnitLevels.LEVEL1;
    this.points = points || this.initialPoints * this.level;
    this.cost = UNIT_COST[this.type];
    this.faction = faction;
    this.selected = false;
    this.rotations = [
      getRandomRotation(5, -5),
      getRandomRotation(),
      getRandomRotation(),
    ];
    this.range = range;
  }

  attack(target: IBoardBox): IAttackResult {
    return {
      origin: { position: this.position, unit: this },
      target: { position: target.position, unit: target.unit },
      gainedPoints: 0,
      couldAttack: false,
    };
  }

  heal(target: IBoardBox): IHealResult {
    return {
      origin: { position: this.position, unit: this },
      target: { position: target.position, unit: target.unit },
      couldHeal: false,
    };
  }

  move(target: IPosition): IUnit {
    this.position = target;
    this.release();
    return this;
  }

  updatePoints(points: number): void {
    this.points = points;
  }

  updatePosition(position: IPosition): void {
    this.position = position;
  }

  fuse(target: IPosition, consumedUnit: IUnit): IUnit {
    this.position = target;
    this.level = this.level + 1;
    this.points = this.points + consumedUnit.points;
    this.release();
    return this;
  }

  select(): IUnit {
    this.selected = true;
    return this;
  }

  release(): IUnit {
    this.selected = false;
    return this;
  }

  render(): ReactNode {
    return (
      <UnitComponent
        type={this.type}
        name={this.name}
        points={this.points}
        level={this.level}
        faction={this.faction}
        selected={this.selected}
        rotations={this.rotations}
      />
    );
  }
}
