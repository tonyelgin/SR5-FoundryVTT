import { ItemType } from './types/ItemType';

export interface ISR5BaseItemDataContainer extends BaseEntityData {
    data: ISR5BaseItemData;
    type: ItemType;
    _id: string;
}

export interface ISR5BaseItemData {}

export default class SR5BaseItem extends Item {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5BaseItemDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">

    constructor(data: BaseEntityData, options?: any) {
        super(data, options);
    }

    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
