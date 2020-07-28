import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';
import { DamageElement } from '../types/common/Damage';
import { ISR5ItemWithEmbedsData, ISR5ItemWithEmbedsDataContainer } from './SR5ItemWithEmbeds';

export interface ISR5ArmorDataContainer extends ISR5ItemWithEmbedsDataContainer {
    data: ISR5ArmorData;
    type: ItemType.Armor;
}

export interface ISR5ArmorData extends ISR5ItemWithEmbedsData {
    armor: {
        value: number;
        stacks: boolean;
        element: {
            [TElement in DamageElement]: {
                value: number;
            };
        };
    };
}

export default class SR5Armor extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5ArmorDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
