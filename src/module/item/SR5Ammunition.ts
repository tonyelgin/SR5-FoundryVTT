import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';

export interface ISR5AmmunitionDataContainer extends ISR5BaseItemDataContainer {
    data: ISR5AmmunitionData;
    type: ItemType.Ammunition;
}

export interface ISR5AmmunitionData extends ISR5BaseItemData {}

export default class SR5Ammunition extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5AmmunitionDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
