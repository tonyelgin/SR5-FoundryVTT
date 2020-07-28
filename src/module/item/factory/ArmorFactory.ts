import { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import BaseItemFactory from './BaseItemFactory';
import { ISR5ArmorDataContainer } from '../SR5Armor';
import { ItemType } from '../types/ItemType';

export default class ArmorFactory extends BaseItemFactory {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5ArmorDataContainer> {
        return {
            ...super.create(data),
            type: ItemType.Armor,
        };
    }
}
