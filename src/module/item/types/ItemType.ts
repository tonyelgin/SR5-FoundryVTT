export enum ItemType {
    Weapon = 'Weapon',
    Armor = 'Armor',
    // Device = 'Device',
    // Program = 'Program',
    Ammunition = 'Ammunition',
    Metatype = 'Metatype',
}

/**
 * Type Guard. Returns the string as an item type if possible.
 * @param value
 */
export function isItemType(value: string): value is ItemType {
    for (const type of Object.values(ItemType)) {
        if (type.toString() === value) {
            return true;
        }
    }
    return false;
}
