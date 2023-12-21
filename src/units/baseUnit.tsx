import { ReactNode } from 'react';
import UnitComponent from '../components/Unit';
import {
  Faction,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
  UNIT_INITIAL_POINTS,
} from '../constants/general';
import { IGame } from '../models/IGame';
import { IPosition } from '../models/IPosition';
import { IUnit } from '../models/IUnit';
import { getRandomRotation } from '../utils/utils';

interface BaseUnitProps {
  type: UnitTypes;
  name: string;
  position: IPosition;
  faction: Faction;
  points?: number;
  level?: UnitLevels;
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

  constructor(props: BaseUnitProps) {
    const { type, name, position, faction, points, level } = props;
    this.type = type;
    this.name = name;
    this.position = position;
    this.initialPoints = UNIT_INITIAL_POINTS[this.type];
    this.points = points || this.initialPoints;
    this.cost = UNIT_COST[this.type];
    this.faction = faction;
    this.level = level || UnitLevels.LEVEL1;
    this.selected = false;
    this.rotations = [
      getRandomRotation(5, -5),
      getRandomRotation(),
      getRandomRotation(),
    ];
  }

  move(game: IGame, target: IPosition): IUnit {
    this.position = target;
    return this;
  }

  attack(game: IGame, target: IPosition): IUnit {
    return this;
  }

  fuse(game: IGame, target: IPosition): IUnit {
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
