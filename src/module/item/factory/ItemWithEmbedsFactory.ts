import BaseItemFactory from './BaseItemFactory';
import { IPreCreateItemData, ItemFactoryData } from './AbstractItemFactory';
import { ISR5ItemWithEmbedsDataContainer } from '../SR5ItemWithEmbeds';

export default abstract class ItemWithEmbedsFactory extends BaseItemFactory {
    create(data: IPreCreateItemData): ItemFactoryData<ISR5ItemWithEmbedsDataContainer> {
        const superData = super.create(data);
        return {
            ...superData,
            flags: {
                ...superData.flags,
                embeddedItems: [],
            },
        };
    }
}
