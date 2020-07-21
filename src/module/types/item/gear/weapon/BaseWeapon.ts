import { BaseItem, BaseItemDataContainer } from '../../BaseItem';

export interface BaseWeapon extends BaseItem {
    type: 'weapon';
    data: BaseWeaponDataContainer;
}

export interface BaseWeaponDataContainer extends BaseItemDataContainer {
    // Second discriminate; will branch on this
    weaponType: WeaponType;
}

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
}

// Alias encase we change later
export type WeaponRecoil = number;

export enum WeaponType {
    Ranged = 'ranged',
    Melee = 'melee',
    Thrown = 'thrown',
    Splash = 'splash',
}
