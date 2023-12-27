import { ReactNode } from 'react';
import UnitComponent from '../components/Unit';
import {
  Faction,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
  UNIT_INITIAL_POINTS,
} from '../constants/general';
import { IAttackResult } from '../models/IAttackResult';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { IBoardBox } from '../models/IGame';
import { getRandomRotation } from '../utils/utils';

interface BaseUnitProps {
  type: UnitTypes;
  name: string;
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
  range: number;
}

export class BaseUnit implements IUnit {
  name: string;
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

  constructor(props: BaseUnitProps) {
    const { type, name, position, faction, points, level, range } = props;
    this.type = type;
    this.name = name;
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

  move(target: IPosition): IUnit {
    this.position = target;
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
