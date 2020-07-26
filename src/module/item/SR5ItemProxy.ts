import SR5BaseItem from './SR5BaseItem';
import { ItemType } from './types/ItemType';
import SR5BaseWeapon from './SR5BaseWeapon';
import SR5Armor from './SR5Armor';

export default class SR5ItemProxy extends Item {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    private _implementation: SR5BaseItem;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization">
    constructor(data: BaseEntityData, options?: any) {
        super(data, options);

        switch (data.type as ItemType) {
            case ItemType.Weapon:
                this._implementation = new SR5BaseWeapon(data, options);
                break;
            case ItemType.Armor:
                this._implementation = new SR5Armor(data, options);
                break;
            case ItemType.Device:
                break;
            case ItemType.Program:
                break;
            case ItemType.Ammunition:
                break;
        }
    }
    // </editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods">

    /** @override */
    update(data: any, options: any): Promise<Item> {
        return this._implementation.update(data, options);
    }
    // </editor-fold>
}
