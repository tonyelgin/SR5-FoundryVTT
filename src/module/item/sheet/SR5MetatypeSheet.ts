import SR5ItemWithEmbedsSheet from './SR5ItemWithEmbedsSheet';
import { ItemType } from '../types/ItemType';
import SR5BaseItemSheet from './SR5BaseItemSheet';

export default class SR5MetatypeSheet extends SR5BaseItemSheet {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties"></editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters">

    get template(): string {
        return `systems/shadowrun5e/dist/templates/item/metatype.html`;
    }

    // </editor-fold>
    // <editor-fold desc="Instance Methods">

    getData(): ItemSheetData {
        const data = super.getData();

        console.warn(`${this.constructor.name} data for ${this.item.name}`);
        console.warn(data);

        return data;
    }

    // </editor-fold>
}
