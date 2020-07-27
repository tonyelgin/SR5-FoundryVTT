import { BaseWeapon, BaseWeaponDataContainer, WeaponType } from './BaseWeapon';

export interface SplashWeapon extends BaseWeapon {
    data: SplashWeaponDataContainer;
}

export interface SplashWeaponDataContainer extends BaseWeaponDataContainer {
    type: WeaponType.Splash;
    blastRadius: number;
    blastDropoff: number;
}
