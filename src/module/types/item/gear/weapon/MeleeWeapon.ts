import { BaseWeapon, BaseWeaponDataContainer, WeaponType } from './BaseWeapon';
import { PhysicalAttributeName } from '../../../common/Attribute';
import { ScaleWithAttribute } from '../../../common/Damage';

export interface MeleeWeapon extends BaseWeapon {
    data: MeleeWeaponDataContainer;
}

export interface MeleeWeaponDataContainer extends BaseWeaponDataContainer {
    weaponType: WeaponType.Melee;
    reach: WeaponReach;
    damage: ScaleWithAttribute<PhysicalAttributeName>;
}

export type WeaponReach = number;
