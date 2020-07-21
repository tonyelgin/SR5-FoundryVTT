import { BaseWeapon, BaseWeaponDataContainer, WeaponRanges, WeaponType } from './BaseWeapon';
import { AttributeName } from '../../../common/Attribute';
import { RangedWeapon, RangedWeaponDataContainer } from './RangedWeapon';
import { ScaleWithAttribute } from '../../../common/Damage';

export interface ThrownWeapon extends BaseWeapon {
    data: ThrownWeaponDataContainer;
}

export interface ThrownWeaponDataContainer extends BaseWeaponDataContainer {
    type: WeaponType.Splash;

    weaponRanges: WeaponRanges;
    weaponRangesFactor: ScaleWithAttribute<AttributeName>;
}

let ThrownWeaponTest = (0 as unknown) as ThrownWeapon;
ThrownWeaponTest;
