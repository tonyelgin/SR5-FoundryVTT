import SR5BaseItem, { ISR5BaseItemData, ISR5BaseItemDataContainer } from './SR5BaseItem';
import { ItemType } from './types/ItemType';
import { AttributeName } from '../common/Attribute';

// Weapon Properties
export interface WeaponModes {
    single_shot: boolean;
    semi_automatic: boolean;
    burst_fire: boolean;
    full_auto: boolean;
}

export interface WeaponRanges {
    short: number;
    medium: number;
    long: number;
    extreme: number;
    attribute: AttributeName;
}

// Alias in case we change later
export type WeaponRecoil = number;

export enum WeaponType {
    Ranged = 'ranged_weapon',
    Melee = 'melee_weapon',
    Thrown = 'thrown_weapon',
    Splash = 'splash_weapon',
}

export interface ISR5WeaponDataContainer extends ISR5BaseItemDataContainer {
    data: ISR5WeaponData;
    type: ItemType.Weapon;
}

export interface ISR5WeaponData extends ISR5BaseItemData {}

export default class SR5Weapon extends SR5BaseItem {
    // <editor-fold desc="Static Properties"></editor-fold>
    // <editor-fold desc="Static Methods"></editor-fold>
    // <editor-fold desc="Properties">

    data: ISR5WeaponDataContainer;

    // </editor-fold>
    // <editor-fold desc="Constructor & Initialization"></editor-fold>
    // <editor-fold desc="Getters & Setters"></editor-fold>
    // <editor-fold desc="Instance Methods"></editor-fold>
}
