export enum WeaponModifierName {
    Damage = 'damage',
    AP = 'ap',
}

export const ModifierName = { ...WeaponModifierName };
export type ModifierName = WeaponModifierName;

export enum ModifierScope {
    Item = 'item',
    Actor = 'actor',
}

export interface Modifier {
    name: string;
    scope: ModifierScope;
    value: number;
}

export interface ModifierList {}
