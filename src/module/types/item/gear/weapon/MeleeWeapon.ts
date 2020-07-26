import { BaseWeapon, BaseWeaponDataContainer, WeaponType } from './BaseWeapon';
import { PhysicalAttributeName } from '../../../../common/Attribute';
import { ScaleWithAttribute } from '../../../common/Damage';
import { NoneType } from '../../../../common/Constants';

export interface MeleeWeapon extends BaseWeapon {
    data: MeleeWeaponDataContainer;
}

export interface MeleeWeaponDataContainer extends BaseWeaponDataContainer {
    type: WeaponType.Melee;
    reach: WeaponReach;
    damage: ScaleWithAttribute<PhysicalAttributeName | NoneType>;
}

export type WeaponReach = number;

let MeleeWeaponTest = (0 as unknown) as MeleeWeapon;
MeleeWeaponTest.data.damage.scaleWith;

let a = (0 as unknown) as typeof NoneType;

if (MeleeWeaponTest.data.damage.scaleWith === NoneType) {
}
