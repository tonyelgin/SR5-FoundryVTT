import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';

export interface ISR5MetatypeDataContainer extends ISR5BaseItemDataContainer {
    data: ISR5MetatypeData;
    type: ItemType.Metatype;
}

export interface ISR5MetatypeData extends ISR5BaseItemData {}

export default class SR5Metatype extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5MetatypeDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
