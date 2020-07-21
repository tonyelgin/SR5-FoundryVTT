import { ThrownWeapon, ThrownWeaponDataContainer } from './ThrownWeapon';
import { BaseWeapon, BaseWeaponDataContainer, WeaponType } from './BaseWeapon';

export interface SplashWeapon extends BaseWeapon {
    data: SplashWeaponDataContainer;
}

export interface SplashWeaponDataContainer extends BaseWeaponDataContainer {
    weaponType: WeaponType.Splash;
    blast_radius: number;
    falloff_per_meter: number;
}
