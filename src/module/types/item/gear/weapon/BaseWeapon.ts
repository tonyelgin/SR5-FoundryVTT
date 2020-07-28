import { IBaseItem, IBaseItemDataContainer } from '../../IBaseItem';
import { AttributeName } from '../../../../common/Attribute';
import { IAvailability, IConcealability } from '../../../common/mixins/DataFields';
import { DamageTrack } from '../../../common/mixins/DamageTrack';
import { DamageType } from '../../../common/Damage';

export interface BaseWeapon extends IBaseItem {
    type: 'weapon';
    data: BaseWeaponDataContainer;
}

export interface BaseWeaponDataContainer extends IBaseItemDataContainer, IAvailability, IConcealability {
    // Second discriminate; will branch on this
    type: WeaponType;

    damageTrack: DamageTrack<DamageType.Matrix>;
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
    attribute: AttributeName;
}

// Alias in case we change later
export type WeaponRecoil = number;

export enum WeaponType {
    Ranged = 'ranged',
    Melee = 'melee',
    Thrown = 'thrown',
    Splash = 'splash',
}
