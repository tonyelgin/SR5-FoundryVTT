import BaseItemFactory from './BaseItemFactory';
import { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import { ISR5MetatypeDataContainer } from '../SR5Metatype';
import { ItemType } from '../types/ItemType';

export default class MetatypeFactory extends BaseItemFactory {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5MetatypeDataContainer> {
        return {
            ...super.create(data),
            type: ItemType.Metatype,
        };
    }
}
