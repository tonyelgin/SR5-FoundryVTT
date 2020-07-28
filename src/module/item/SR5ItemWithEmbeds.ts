import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';

export interface ISR5ItemWithEmbedsDataContainer extends ISR5BaseItemDataContainer {
    type: ItemType;
    data: ISR5ItemWithEmbedsData;
    flags: {
        embeddedItems: Item[];
    };
}
export interface ISR5ItemWithEmbedsData extends ISR5BaseItemData {}

export default class SR5ItemWithEmbeds extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
