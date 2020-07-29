import AbstractItemFactory, { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import { ISR5BaseItemDataContainer } from '../SR5BaseItem';

export default abstract class BaseItemFactory extends AbstractItemFactory<ISR5BaseItemDataContainer> {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5BaseItemDataContainer> {
        return {
            data: {},
            flags: {},
            name: data.name,
            type: data.type,
            // '' still forces foundry to generate which is the desired behavior
            _id: '',
        };
    }
}
