import SR5BaseItem, { ISR5BaseItemDataContainer } from '../item/SR5BaseItem';
import { ItemFactoryData } from '../item/factory/AbstractItemFactory';
import SR5Armor from '../item/SR5Armor';

/**
 * Helper to get base item data
 * @param item
 */
export function getBaseItemData<T extends SR5BaseItem>(item: T): T['data'] {
    return {
        _id: item._id,
        name: item.name,
        type: item.data.type,
        data: item.data,
        flags: item.data.flags,
    };
}
