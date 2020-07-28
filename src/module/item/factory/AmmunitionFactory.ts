import { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import BaseItemFactory from './BaseItemFactory';
import { ISR5AmmunitionDataContainer } from '../SR5Ammunition';
import { ItemType } from '../types/ItemType';

export default class AmmunitionFactory extends BaseItemFactory {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5AmmunitionDataContainer> {
        return {
            ...super.create(data),
            type: ItemType.Ammunition,
        };
    }
}
