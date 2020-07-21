import { BaseWeapon, BaseWeaponDataContainer, WeaponRecoil, WeaponModes, WeaponRanges, WeaponType } from './BaseWeapon';

export interface RangedWeapon extends BaseWeapon {}

export interface RangedWeaponDataContainer extends BaseWeaponDataContainer {
    weaponType: WeaponType.Ranged;
    recoilCompensation: WeaponRecoil;
    fireModes: WeaponModes;
    ranges: WeaponRanges;
}
