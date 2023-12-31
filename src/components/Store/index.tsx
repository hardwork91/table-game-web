import { FunctionComponent, useEffect, useState } from 'react';
import {
  Faction,
  UnitLevels,
  UnitTypes,
  UNIT_COST,
  UNIT_NAMES,
} from '../../constants/general';
import { IUnit } from '../../models/IUnit';
import BoxContainer from '../BoxContainer';
import UnitComponent from '../Unit';
import './index.css';

interface StoreProps {
  score: number;
  selectedItem?: UnitTypes;
  onSlectItem: (itemType: UnitTypes) => void;
  disabled?: boolean;
}

const Store: FunctionComponent<StoreProps> = ({
  score,
  selectedItem,
  onSlectItem,
  disabled,
}) => {
  const handleStoreItemSelection = (itemType: UnitTypes) => {
    onSlectItem(itemType);
  };

  const renderUnit = (type: UnitTypes) => (
    <BoxContainer
      onClick={() => handleStoreItemSelection(type)}
      disabled={disabled || score < UNIT_COST[type]}
    >
      <UnitComponent
        name={UNIT_NAMES[type]}
        points={UNIT_COST[type]}
        level={UnitLevels.LEVEL1}
        faction={Faction.ALLY}
        type={UnitTypes[type]}
        selected={selectedItem === type}
        rotations={[]}
      ></UnitComponent>
    </BoxContainer>
  );

  return (
    <>
      <div className='store-title'>BUY</div>
      <div className='store-items-container'>
        {renderUnit(UnitTypes.WARRIOR)}
        {renderUnit(UnitTypes.ARCHER)}
        {renderUnit(UnitTypes.MAGE)}
      </div>
    </>
  );
};

export default Store;
